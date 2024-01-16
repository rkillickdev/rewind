import React, { useEffect, useState } from "react";

import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/SnapshotsPage.module.css";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Snapshot from "./Snapshot";

import NoResults from "../../assets/no-results.png";
import Asset from "../../components/Asset";

function SnapshotsPage({ message, filter = "" }) {
  const [snapshots, setSnapshots] = useState({ results: [] });
  const [hasLoaded, setHasLoaded] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const fetchSnapshots = async () => {
      try {
        const { data } = await axiosReq.get(`/snapshots/?${filter}`);
        setSnapshots(data);
        setHasLoaded(true);
      } catch (err) {
        console.log(err);
      }
    };

    setHasLoaded(false);
    fetchSnapshots();
  }, [filter, pathname]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles mobile</p>
        {hasLoaded ? (
          <>
            {snapshots.results.length ? (
              snapshots.results.map((snapshot) => (
                <Snapshot
                  key={snapshot.id}
                  {...snapshot}
                  setSnapshots={setSnapshots}
                />
              ))
            ) : (
              <Container className="appStyles.Content">
                <Asset src={NoResults} message={message} />
              </Container>
            )}
          </>
        ) : (
          <Container className="appStyles.Content">
            <Asset spinner />
          </Container>
        )}
      </Col>
      <Col md={4} className="d-none d-lg-block p-0 p-lg-2">
        <p>Popular profiles for desktop</p>
      </Col>
    </Row>
  );
}

export default SnapshotsPage;
