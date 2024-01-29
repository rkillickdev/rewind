import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const RelevantProfiles = ({ mobile }) => {
  const currentUser = useCurrentUser();
  const genre_preference = currentUser?.genre_preference || "";
  const era_preference = currentUser?.era_preference || "";
  const { popularProfiles } = useProfileData();
  const preferenceFilteredProfiles = popularProfiles.results
    .filter((profile) => profile.id !== currentUser?.profile_id)
    .filter(
      (profile) =>
        profile.genre_preference === genre_preference ||
        profile.era_preference === era_preference,
    );

  console.log(preferenceFilteredProfiles);

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularProfiles.results.length ? (
        preferenceFilteredProfiles.length ? (
          <>
            <p>Profiles you might like</p>
            {mobile ? (
              <div className="d-flex justify-content-around">
                {preferenceFilteredProfiles.slice(0, 4).map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
              </div>
            ) : (
              preferenceFilteredProfiles
                .slice(0, 8)
                .map((profile) => (
                  <Profile key={profile.id} profile={profile} />
                ))
            )}
          </>
        ) : (
          <span>No Results</span>
        )
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default RelevantProfiles;
