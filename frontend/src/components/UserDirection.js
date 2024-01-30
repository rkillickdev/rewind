import React from "react";
import { Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import btnStyles from "../styles/Button.module.css";

const UserDirection = ({ src, text, button, hide }) => {
  return (
    <Container>
      <Card className={`mb-4 ${hide}`}>
        <Card.Title className="text-center mb-0 pt-4">
          <h1 className="mb-0">{text}</h1>
        </Card.Title>
        <Card.Img className="img-fluid rounded" src={src} />
        <Link className="align-self-center" to="/signin">
          <button
            type="button"
            className={`${btnStyles.Button} ${btnStyles.Wide} ${btnStyles.Primary} mb-4`}
          >
            {button}
          </button>
        </Link>
      </Card>
    </Container>
  );
};

export default UserDirection;
