import React from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import UserDirection from "../../components/UserDirection";
import DrumMachine from "../../assets/roland-808.webp";

const RelevantProfiles = ({ mobile }) => {
  const currentUser = useCurrentUser();
  const profile_id = currentUser?.profile_id || "";
  const genre_preference = currentUser?.genre_preference || "";
  const era_preference = currentUser?.era_preference || "";
  const category_preference = currentUser?.category_preference || "";
  const { popularProfiles } = useProfileData();
  const preferenceFilteredProfiles = popularProfiles.results
    .filter((profile) => profile.id !== currentUser?.profile_id)
    .filter(
      (profile) =>
        profile.genre_preference === genre_preference ||
        profile.era_preference === era_preference ||
        profile.category_preference === category_preference,
    );

  return popularProfiles.results.length ? (
    preferenceFilteredProfiles.length ? (
      <Container
        className={`${appStyles.Content} ${
          mobile && "d-lg-none text-center mb-3"
        }`}
      >
        <h2 className={`${appStyles.FeatureHeading} text-center`}>
          Profiles you might like
        </h2>
        {mobile ? (
          <div className="d-flex justify-content-around">
            {preferenceFilteredProfiles.slice(0, 4).map((profile) => (
              <Profile key={profile.id} profile={profile} mobile />
            ))}
          </div>
        ) : (
          preferenceFilteredProfiles
            .slice(0, 6)
            .map((profile) => <Profile key={profile.id} profile={profile} />)
        )}
      </Container>
    ) : (
      <>
        <UserDirection
          hide={mobile && "d-lg-none"}
          hideImage={mobile && "d-none"}
          heading="Tell Us More"
          src={DrumMachine}
          alt="Retro drum machine"
          text="Let us know your interests and we'll suggest some profiles you might like"
          page={`/profiles/${profile_id}/edit`}
          button="Preferences"
          mobile
        />
        <Container
          className={`${appStyles.Content} ${
            mobile && "d-lg-none text-center mb-3"
          }`}
        >
          <h2 className={`${appStyles.FeatureHeading} text-center`}>
            Popular Profiles
          </h2>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results.slice(0, 4).map((profile) => (
                <Profile key={profile.id} profile={profile} mobile />
              ))}
            </div>
          ) : (
            popularProfiles.results
              .slice(0, 6)
              .map((profile) => <Profile key={profile.id} profile={profile} />)
          )}
        </Container>
      </>
    )
  ) : (
    <Asset spinner />
  );
};

export default RelevantProfiles;
