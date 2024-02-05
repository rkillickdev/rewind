import React from "react";
import CassetteTapes from "../assets/multi-cassette-tapes.webp";
import styles from "../styles/NotFound.module.css";
import UserDirection from "./UserDirection";

const Error = () => {
  return (
    <div className={styles.NoPageResults}>
      <UserDirection
        src={CassetteTapes}
        alt="Multi coloured cassette tapes"
        heading="There has been a problem with your request"
        button="Go Home"
        page="/"
      />
    </div>
  );
};

export default Error;
