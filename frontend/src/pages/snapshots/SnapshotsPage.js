import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import HeroImage from "../../assets/cassette-player-retro.webp";

import styles from "../../styles/SnapshotsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Snapshot from "./Snapshot";

import NoResults from "../../assets/no-results.png";
import InfiniteScroll from "react-infinite-scroll-component";
import Asset from "../../components/Asset";
import { fetchMoreData } from "../../utils/utils";
import RelevantProfiles from "../profiles/RelevantProfiles";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import AddSnapshot from "../../components/AddSnapshot";
import UserDirection from "../../components/UserDirection";

function SnapshotsPage({ message, filter = "", curated, pinboard }) {
  const [snapshots, setSnapshots] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();
  const { handleFollow, handleUnfollow } = useSetProfileData();
  const currentUser = useCurrentUser();
  const genre_preference = currentUser?.genre_preference || "";
  const era_preference = currentUser?.era_preference || "";
  const category_preference = currentUser?.category_preference || "";

  const curatedSnapshots = snapshots.results.filter(
    (snapshot) =>
      snapshot.genre === genre_preference ||
      snapshot.era === era_preference ||
      snapshot.category === category_preference,
  );

  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        const { data } = await axiosReq.get(
          `/snapshots/?${filter}search=${query}`,
        );
        setSnapshots(data);
        setHasLoaded(true);
      } catch (err) {
        // console.log(err);
      }
    };

    setHasLoaded(false);
    const timer = setTimeout(() => {
      fetchSnapshots();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [filter, query, pathname, currentUser, handleFollow, handleUnfollow]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {currentUser ? (
          <RelevantProfiles mobile />
        ) : (
          <UserDirection
            hide="d-lg-none"
            src={HeroImage}
            heading="Take a trip back in time"
            page="/signin"
            button="Get Started"
          />
        )}
        <Row>
          <Col xs={8} className="my-auto">
            <i className={`fas fa-search ${styles.SearchIcon}`}></i>
            <Form
              className={styles.SearchBar}
              onSubmit={(event) => event.preventDefault()}
            >
              <Form.Control
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                type="text"
                className="mr-sm-2"
                placeholder="Search snapshots"
              ></Form.Control>
            </Form>
          </Col>
          <Col>
            <AddSnapshot />
          </Col>
        </Row>
        {hasLoaded ? (
          currentUser ? (
            <>
              {snapshots.results.length ? (
                curated && curatedSnapshots.length ? (
                  <InfiniteScroll
                    children={curatedSnapshots.map((snapshot) => (
                      <Snapshot
                        key={snapshot.id}
                        {...snapshot}
                        setSnapshots={setSnapshots}
                      />
                    ))}
                    dataLength={snapshots.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!snapshots.next}
                    next={() => fetchMoreData(snapshots, setSnapshots)}
                  />
                ) : (
                  <InfiniteScroll
                    children={snapshots.results.map((snapshot) => (
                      <Snapshot
                        key={snapshot.id}
                        {...snapshot}
                        setSnapshots={setSnapshots}
                        pinboard={pinboard}
                      />
                    ))}
                    dataLength={snapshots.results.length}
                    loader={<Asset spinner />}
                    hasMore={!!snapshots.next}
                    next={() => fetchMoreData(snapshots, setSnapshots)}
                  />
                )
              ) : (
                <Container className="appStyles.Content">
                  <Asset src={NoResults} message={message} />
                </Container>
              )}
            </>
          ) : (
            <>
              {snapshots.results.length ? (
                <InfiniteScroll
                  children={snapshots.results.map((snapshot) => (
                    <Snapshot
                      key={snapshot.id}
                      {...snapshot}
                      setSnapshots={setSnapshots}
                    />
                  ))}
                  dataLength={snapshots.results.length}
                  loader={<Asset spinner />}
                  hasMore={!!snapshots.next}
                  next={() => fetchMoreData(snapshots, setSnapshots)}
                />
              ) : (
                <Container className="appStyles.Content">
                  <Asset src={NoResults} message={message} />
                </Container>
              )}
            </>
          )
        ) : (
          <Container className="appStyles.Content">
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        {currentUser ? (
          <RelevantProfiles />
        ) : (
          <UserDirection
            src={HeroImage}
            heading="Take a trip back in time"
            page="/signin"
            button="Get Started"
          />
        )}
      </Col>
    </Row>
  );
}

export default SnapshotsPage;
