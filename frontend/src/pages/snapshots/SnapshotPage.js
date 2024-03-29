import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";

import appStyles from "../../App.module.css";
import styles from "../../styles/SnapshotPage.module.css";
import HeroImage from "../../assets/cassette-player-retro.webp";

import { axiosReq } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useAlert from "../../hooks/useAlert";
import { fetchMoreData } from "../../utils/utils";
import Snapshot from "./Snapshot";
import CommentCreateForm from "../comments/CommentCreateForm";
import Comment from "../comments/Comment";
import Asset from "../../components/Asset";
import RelevantProfiles from "../profiles/RelevantProfiles";
import SampleCreateForm from "../samples/SampleCreateForm";
import Sample from "../samples/Sample";
import UserDirection from "../../components/UserDirection";

function SnapshotPage() {
  const { id } = useParams();
  const [snapshot, setSnapshot] = useState({ results: [] });
  const currentUser = useCurrentUser();
  const profile_image = currentUser?.profile_image;
  const [comments, setComments] = useState({ results: [] });
  const [samples, setSamples] = useState({ results: [] });
  const history = useHistory();
  const { setAlert } = useAlert();

  useEffect(() => {
    // Fetch Snapshot by id and all associated comments and samples on mount
    const handleMount = async () => {
      try {
        const [{ data: snapshot }, { data: comments }, { data: samples }] =
          await Promise.all([
            axiosReq.get(`/snapshots/${id}`),
            axiosReq.get(`comments/?snapshot=${id}`),
            axiosReq.get(`samples/?snapshot=${id}`),
          ]);
        setSnapshot({ results: [snapshot] });
        setComments(comments);
        setSamples(samples);
      } catch (err) {
        history.push("/");
        setAlert("sorry, something went wrong.  Try again later.", "warning");
        // console.log(err);
      }
    };

    handleMount();
  }, [id]);

  return (
    <Row className="h-100">
      <Col className="py-2 p-0 p-lg-2" lg={8}>
        {/* Render Relevant Profiles */}
        {currentUser && <RelevantProfiles mobile />}
        {/* Render Sample Create Form */}
        {currentUser && (
          <Container className={appStyles.Content}>
            <SampleCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              snapshot={id}
              setSnapshot={setSnapshot}
              setSamples={setSamples}
              {...snapshot.results[0]}
            />
            {/* Render Comment Create Form */}
            <CommentCreateForm
              profile_id={currentUser.profile_id}
              profileImage={profile_image}
              snapshot={id}
              setSnapshot={setSnapshot}
              setComments={setComments}
            />
          </Container>
        )}
        {/* Render Snapshot */}
        <Snapshot
          {...snapshot.results[0]}
          setSnapshots={setSnapshot}
          snapshotPage
        />
        <Container className={appStyles.Content}>
          {/* Render Samples */}
          {samples.results.length > 0 &&
            samples.results
              .filter(
                (sample) =>
                  sample.approved || sample.owner === currentUser?.username,
              )
              .map((sample) => (
                <Sample
                  key={sample.id}
                  {...sample}
                  setSnapshot={setSnapshot}
                  setSamples={setSamples}
                />
              ))}
          {/* Render Comments */}
          {comments.results.length ? (
            <InfiniteScroll
              children={comments.results.map((comment) => (
                <Comment
                  key={comment.id}
                  {...comment}
                  setSnapshot={setSnapshot}
                  setComments={setComments}
                />
              ))}
              dataLength={comments.results.length}
              loader={<Asset spinner />}
              hasMore={!!comments.next}
              next={() => fetchMoreData(comments, setComments)}
            />
          ) : currentUser ? (
            <>
              <hr />
              <span className={styles.CommentMessage}>
                No comments yet. Be the first to comment.
              </span>
            </>
          ) : (
            <>
              <hr />
              <span className={styles.CommentMessage}>No comments yet</span>
            </>
          )}
        </Container>
      </Col>
      <Col lg={4} className="d-none d-lg-block p-0 p-lg-2">
        {/* Render Relevant Profiles or welcome message */}
        {currentUser ? (
          <RelevantProfiles />
        ) : (
          <UserDirection
            src={HeroImage}
            alt="Retro boombox"
            heading="Take a trip back in time"
            page="/signin"
            button="Get Started"
          />
        )}
      </Col>
    </Row>
  );
}

export default SnapshotPage;
