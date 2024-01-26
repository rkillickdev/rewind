import React, { useEffect, useState } from "react";
import appStyles from "../../App.module.css";
import { Container } from "react-bootstrap";
import Asset from "../../components/Asset";
import Profile from "./Profile";
import { useProfileData } from "../../contexts/ProfileDataContext";
import { useCurrentUser } from "../../contexts/CurrentUserContext";

const RelevantProfiles = ({ mobile }) => {
  const currentUser = useCurrentUser();
  const { popularProfiles } = useProfileData();

  return (
    <Container
      className={`${appStyles.Content} ${
        mobile && "d-lg-none text-center mb-3"
      }`}
    >
      {popularProfiles.results.length ? (
        <>
          <p>Most followed profiles.</p>
          {mobile ? (
            <div className="d-flex justify-content-around">
              {popularProfiles.results
                .filter((profile) => profile.id !== currentUser?.profile_id)
                .slice(0, 4)
                .map((profile) => (
                  <Profile key={profile.id} profile={profile} mobile />
                ))}
            </div>
          ) : (
            popularProfiles.results
              .filter((profile) => profile.id !== currentUser?.profile_id)
              .map((profile) => <Profile key={profile.id} profile={profile} />)
          )}
        </>
      ) : (
        <Asset spinner />
      )}
    </Container>
  );
};

export default RelevantProfiles;
