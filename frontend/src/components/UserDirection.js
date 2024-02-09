import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

import appStyles from "../App.module.css";
import btnStyles from "../styles/Button.module.css";

const UserDirection = ({
  src,
  alt,
  heading,
  button,
  hide,
  page,
  text,
  hideImage,
  reset,
  resetLabel,
}) => {
  return (
    // Render elements conditionally based on props passed to component
    <Card className={`mb-4 p-4 ${hide}`}>
      {heading && (
        <Card.Title className="text-center mb-0">
          <h1 className={`${appStyles.FeatureHeading} mb-4 px-4 text-center`}>
            {heading}
          </h1>
        </Card.Title>
      )}
      {reset && (
        <button
          onClick={reset}
          type="button"
          className={`${btnStyles.Button} ${btnStyles.Feature}`}
        >
          {resetLabel}
        </button>
      )}
      {src && (
        <Card.Img
          className={`img-fluid rounded mb-4 ${hideImage}`}
          src={src}
          alt={alt}
        />
      )}
      {text && (
        <Card.Text>
          <p className={`${appStyles.FeatureHeading} h5 text-center`}>{text}</p>
        </Card.Text>
      )}
      {button && (
        <Link className="align-self-center" to={page}>
          <button
            type="button"
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Feature}`}
          >
            {button}
          </button>
        </Link>
      )}
    </Card>
  );
};

export default UserDirection;
