import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

import Button from "react-bootstrap/Button";
import styles from "../../styles/Profile.module.css";
import btnStyles from "../../styles/Button.module.css";

import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { useSetProfileData } from "../../contexts/ProfileDataContext";
import Avatar from "../../components/Avatar";

const Profile = (props) => {
  const { profile, mobile, imageSize = 55 } = props;

  // destructure profile prop
  const { id, following_id, image, owner } = profile;

  // establish current user with useCurrentUser hook
  const currentUser = useCurrentUser();

  const is_owner = currentUser?.username === owner;
  const { handleFollow, handleUnfollow } = useSetProfileData();

  return (
    <div
      className={`my-3 d-flex align-items-center ${mobile && "flex-column"}`}
    >
      <div>
        <Link className="align-self-center" to={`/profiles/${id}`}>
          <Avatar src={image} height={imageSize} />
        </Link>
      </div>
      <div className={`mx-2 ${styles.WordBreak}`}>
        <strong>{owner}</strong>
      </div>
      <div className={`text-right ${!mobile && "ml-auto"}`}>
        {/* Display follow/ unfollow buttons based on conditions */}
        {!mobile &&
          currentUser &&
          !is_owner &&
          (following_id ? (
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
      </div>
    </div>
  );
};

export default Profile;
