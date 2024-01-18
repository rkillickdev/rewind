import React, { useEffect, useState } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import { useParams } from "react-router-dom";
import { axiosReq } from "../../api/axiosDefaults";
import Snapshot from "./Snapshot";
import CommentCreateForm from "../comments/CommentCreateForm";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import Comment from "../comments/Comment";

function SnapshotPage() {
  const { id } = useParams();
  const [snapshot, setSnapshot] = useState({ results: [] });

  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });

  useEffect(() => {
    const handleMount = async () => {
      try {
        const [{ data: snapshot }, { data: comments }] = await Promise.all([
          axiosReq.get(`/snapshots/${id}`),
          axiosReq.get(`comments/?snapshot${id}`),
        ]);
        setSnapshot({ results: [snapshot] });
        setComments(comments);
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
        <Container className={appStyles.Content}>
          {currentUser ? (
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              snapshot={id}
              setSnapshot={setSnapshot}
              setComments={setComments}
            />
          ) : comments.results.length ? (
            "Comments"
          ) : null}
          {comments.results.length ? (
            comments.results.map((comment) => (
              <Comment
                key={comment.id}
                {...comment}
                setSnapshot={setSnapshot}
                setComments={setComments}
              />
            ))
          ) : currentUser ? (
            <span>No comments yet. Be the first to comment.</span>
          ) : (
            <span>No comments yet</span>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        Popular profiles for desktop
      </Col>
    </Row>
  );
}

export default SnapshotPage;
