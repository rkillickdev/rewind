import React from "react";
import appStyles from "../App.module.css";
import styles from "../styles/AddSnapshot.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom";

const AddSnapshot = () => {
  const currentUser = useCurrentUser();

  const addSnapshotIcon = (
    <>
      <div>
        <Link className={styles.AddSnapshotIcon} to="/snapshots/create">
          <div className="d-flex flex-column align-items-center">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <p className={`${appStyles.FeatureHeading} text-center h4`}>
              Add snapshot
            </p>
          </div>
        </Link>
      </div>
    </>
  );

  return currentUser && addSnapshotIcon;
};

export default AddSnapshot;
