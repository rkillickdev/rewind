import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import appStyles from "../App.module.css";
import btnStyles from "../styles/Button.module.css";

const UserDirection = ({ src, heading, button, hide, page, text }) => {
  return (
    <Container>
      <Card className={`mb-4 ${hide}`}>
        {heading && (
          <Card.Title className="text-center mb-0 pt-4">
            <h1 className={`${appStyles.FeatureHeading} mb-0 px-4`}>
              {heading}
            </h1>
          </Card.Title>
        )}
        {src && <Card.Img className={`img-fluid rounded ${hide}`} src={src} />}
        {text && (
          <Card.Text>
            <p>{text}</p>
          </Card.Text>
        )}
        <Link className="align-self-center" to={page}>
          <button
            type="button"
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Feature} my-4`}
          >
            {button}
          </button>
        </Link>
      </Card>
    </Container>
  );
};

export default UserDirection;
