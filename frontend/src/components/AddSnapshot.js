import React from "react";
import styles from "../styles/AddSnapshot.module.css";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { Link } from "react-router-dom/cjs/react-router-dom";
import { Container } from "react-bootstrap";

const AddSnapshot = ({ mobile }) => {
  const currentUser = useCurrentUser();

  const addSnapshotIcon = (
    <>
      <Container className={`${mobile && "d-lg-none"}`}>
        <div className="row justify-content-center">
          <Link className={styles.AddSnapshotIcon} to="/snapshots/create">
            <div className="d-flex flex-column align-items-center">
              <i className="fa-solid fa-clock-rotate-left"></i>
              <p className="text-center">Add snapshot</p>
            </div>
          </Link>
        </div>
      </Container>
    </>
  );

  return currentUser && addSnapshotIcon;
};

export default AddSnapshot;
