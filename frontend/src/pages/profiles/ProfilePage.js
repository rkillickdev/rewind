import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Image from "react-bootstrap/Image";

import HeroImage from "../../assets/cassette-player-retro.webp";
import NoResults from "../../assets/no-results-icon.webp";
import styles from "../../styles/ProfilePage.module.css";
import appStyles from "../../App.module.css";
import btnStyles from "../../styles/Button.module.css";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import {
  useProfileData,
  useSetProfileData,
} from "../../contexts/ProfileDataContext";
import useAlert from "../../hooks/useAlert";
import { fetchMoreData } from "../../utils/utils";
import Snapshot from "../snapshots/Snapshot";
import RelevantProfiles from "./RelevantProfiles";
import { ProfileEditOptions } from "../../components/EditDelete";
import UserDirection from "../../components/UserDirection";
import Asset from "../../components/Asset";

function ProfilePage() {
  const [hasLoaded, setHasLoaded] = useState(false);
  const currentUser = useCurrentUser();
  const { id } = useParams();
  const { setProfileData, handleFollow, handleUnfollow } = useSetProfileData();
  const { pageProfile } = useProfileData();
  const [profile] = pageProfile.results;
  const is_owner = currentUser?.username === profile?.owner;
  const [profileSnapshots, setProfileSnapshots] = useState({ results: [] });
  const history = useHistory();
  const { setAlert } = useAlert();

  useEffect(() => {
    // Retrieves data for specific profile and snapshots owned by the profile
    const fetchData = async () => {
      try {
        const [{ data: pageProfile }, { data: profileSnapshots }] =
          await Promise.all([
            axiosReq.get(`/profiles/${id}/`),
            axiosReq.get(`/snapshots/?owner__profile=${id}`),
          ]);
        setProfileData((prevState) => ({
          ...prevState,
          pageProfile: { results: [pageProfile] },
        }));
        setProfileSnapshots(profileSnapshots);
        setHasLoaded(true);
      } catch (err) {
        history.push("/");
        setAlert("sorry, something went wrong", "warning");
        // console.log(err);
      }
    };
    fetchData();
  }, [id, setProfileData]);

  // Profile data associated with the specified profile id
  const mainProfile = (
    <>
      <Row noGutters className="px-3 text-center">
        <Col lg={3} className="text-lg-left">
          <Image
            className={styles.ProfileImage}
            roundedCircle
            src={profile?.image}
            alt="profile picture"
          />
        </Col>
        <Col lg={6}>
          <h2 className="m-2 ">{profile?.owner}</h2>
          <Row className="justify-content-center no-gutters">
            <Col xs={3} className="m-2">
              <div className={styles.FeatureInfo}>
                {profile?.snapshots_count}
              </div>
              <div>snapshots</div>
            </Col>
            <Col xs={3} className="m-2">
              <div className={styles.FeatureInfo}>
                {profile?.followers_count}
              </div>
              <div>followers</div>
            </Col>
            <Col xs={3} className="m-2">
              <div className={styles.FeatureInfo}>
                {profile?.following_count}
              </div>
              <div>following</div>
            </Col>
          </Row>
        </Col>
        <Col lg={3} className="text-center align-items-center">
          {currentUser &&
            !is_owner &&
            (profile?.following_id ? (
              <Button
                className={`${btnStyles.Button} ${btnStyles.FeatureOutline}`}
                onClick={() => handleUnfollow(profile)}
              >
                unfollow
              </Button>
            ) : (
              <Button
                className={`${btnStyles.Button} ${btnStyles.Feature}`}
                onClick={() => handleFollow(profile)}
              >
                follow
              </Button>
            ))}
        </Col>
        {profile?.is_owner && <ProfileEditOptions id={profile?.id} />}
        {profile?.content && <Col className="p-3">{profile.content}</Col>}
      </Row>
    </>
  );

  // List of all snapshots owned by the profile
  const mainProfilePosts = (
    <>
      <hr />
      <p className="text-center">{profile?.owner}'s posts</p>
      <hr />
      {profileSnapshots.results.length ? (
        <InfiniteScroll
          children={profileSnapshots.results.map((snapshot) => (
            <Snapshot
              key={snapshot.id}
              {...snapshot}
              setSnapshots={setProfileSnapshots}
            />
          ))}
          dataLength={profileSnapshots.results.length}
          loader={<Asset spinner />}
          hasMore={!!profileSnapshots.next}
          next={() => fetchMoreData(profileSnapshots, setProfileSnapshots)}
        />
      ) : (
        <Asset
          src={NoResults}
          message={`No results found, ${profile?.owner} hasn't posted yet.`}
        />
      )}
    </>
  );

  return (
    <Row>
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {currentUser ? (
          <RelevantProfiles mobile />
        ) : (
          <UserDirection
            hide="d-lg-none"
            src={HeroImage}
            alt="Retro boombox"
            heading="Take a trip back in time"
            page="/signup"
            button="Get Started"
          />
        )}
        <Container className={appStyles.Content}>
          {hasLoaded ? (
            <>
              {mainProfile}
              {mainProfilePosts}
            </>
          ) : (
            <Asset spinner />
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        {currentUser ? (
          <RelevantProfiles />
        ) : (
          <UserDirection
            src={HeroImage}
            alt="Retro boombox"
            heading="Take a trip back in time"
            page="/signup"
            button="Get Started"
          />
        )}
      </Col>
    </Row>
  );
}

export default ProfilePage;
