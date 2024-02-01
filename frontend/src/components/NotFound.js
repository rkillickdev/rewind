import React from "react";
import CassetteTapes from "../assets/multi-cassette-tapes.webp";
import styles from "../styles/NotFound.module.css";
import UserDirection from "./UserDirection";

const NotFound = () => {
  return (
    <div className={styles.NoPageResults}>
      <UserDirection
        src={CassetteTapes}
        heading="Sorry, the page you're looking for doesn't exist"
        button="Go Home"
        page="/"
      />
    </div>
  );
};

export default NotFound;
