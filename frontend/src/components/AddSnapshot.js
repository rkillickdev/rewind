import React from "react";
import styles from "../styles/AddSnapshot.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Container } from "react-bootstrap";

const AddSnapshot = () => {
  const currentUser = useCurrentUser();

  const addSnapshotIcon = (
    <>
      <div>
        <Link className={styles.AddSnapshotIcon} to="/snapshots/create">
          <div className="d-flex flex-column align-items-center">
            <i className="fa-solid fa-clock-rotate-left"></i>
            <p className="text-center">Add snapshot</p>
          </div>
        </Link>
      </div>
    </>
  );

  return currentUser && addSnapshotIcon;
};

export default AddSnapshot;
