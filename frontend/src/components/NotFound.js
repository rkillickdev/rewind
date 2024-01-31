import React from "react";
import DrumMachine from "../assets/roland-808.webp";
import styles from "../styles/NotFound.module.css";
import UserDirection from "./UserDirection";

const NotFound = () => {
  return (
    <div className={styles.NoPageResults}>
      <UserDirection
        src={DrumMachine}
        heading="Sorry, the page you're looking for doesn't exist"
        button="Go Home"
      />
    </div>
  );
};

export default NotFound;
