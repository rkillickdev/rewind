import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Snapshot from "./Snapshot";

function SnapshotPage() {
  const { id } = useParams();
  const [snapshot, setSnapshot] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: snapshot }] = await Promise.all([
          axiosReq.get(`/snapshots/${id}`),
        ]);
        setSnapshot({ results: [snapshot] });
        console.log(snapshot);
      } catch (err) {
        console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        <p>Popular profiles for mobile</p>
        <Snapshot
          {...snapshot.results[0]}
          setSnapshots={setSnapshot}
          snapshotPage
        />
        <Container className={appStyles.Content}>Comments</Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default SnapshotPage;
