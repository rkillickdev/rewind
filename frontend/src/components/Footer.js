import React from "react";
import Container from "react-bootstrap/Container";
import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer className={styles.Footer}>
        <Container>
          <div className="row">
            <div className="d-flex flex-column justify-content-center py-2 align-items-center gap-1 m-auto">
              <p className="lead mb-auto">© rkillickdev</p>
              <a
                href="https://github.com/rkillickdev/rewind"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit the developer's GitHub page (opens in a new tab)"
              >
                <i className="fa-brands fa-github fa-3x"></i>
              </a>
            </div>
          </div>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
