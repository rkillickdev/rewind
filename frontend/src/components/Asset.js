import React from "react";
import Spinner from "react-bootstrap/Spinner";

import appStyles from "../App.module.css";
import styles from "../styles/Asset.module.css";

const Asset = ({ spinner, src, message, height, width }) => {
  return (
    <div className={`${styles.Asset} p-4`}>
      {spinner && (
        <Spinner animation="border" role="status" className={appStyles.Spinner}>
          <span className="sr-only">Loading...</span>
        </Spinner>
      )}
      {src && (
        <img
          className="img-fluid"
          src={src}
          alt={message}
          height={height}
          width={width}
        />
      )}
      {message && (
        <p className={`${appStyles.FeatureHeading} mt-4 h2 text-center`}>
          {message}
        </p>
      )}
    </div>
  );
};

export default Asset;
