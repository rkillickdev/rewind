import React from "react";
import CassetteTapes from "../assets/multi-cassette-tapes.webp";
import styles from "../styles/NotFound.module.css";
import UserDirection from "./UserDirection";

const ErrorFallback = ({ resetErrorBoundary }) => {
  return (
    <div className={styles.NoPageResults}>
      <UserDirection
        src={CassetteTapes}
        alt="Multi coloured cassette tapes"
        heading="There has been a problem"
        reset={resetErrorBoundary}
        resetLabel="Try again"
      />
    </div>
  );
};

export default ErrorFallback;
