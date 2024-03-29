import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

import Card from "react-bootstrap/Card";
import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import appStyles from "../../App.module.css";
import styles from "../../styles/Snapshot.module.css";
import Waveform from "../../assets/sound-waves.png";

import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useAlert from "../../hooks/useAlert";
import Avatar from "../../components/Avatar";
import EditDelete from "../../components/EditDelete";
import ModalPopup from "../../components/ModalPopup";

const Snapshot = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    updated_at,
    title,
    description,
    image,
    recommendation_id,
    pin_id,
    comments_count,
    recommendations_count,
    samples_count,
    snapshotPage,
    setSnapshots,
    pinboard,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();
  const { setAlert } = useAlert();

  // function to redirect user to edit page
  const handleEdit = () => {
    history.push(`/snapshots/${id}/edit`);
  };

  // function to handle deletion of snapshots
  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/snapshots/${id}/`);
      setAlert("You deleted a Snapshot", "success");
      history.goBack();
    } catch (err) {
      // console.log(err);
      setAlert("sorry, something went wrong.  Try again later.", "warning");
    }
  };

  // Function to handle recommending a snapshot
  const handleRecommend = async () => {
    try {
      const { data } = await axiosRes.post("/recommendations/", {
        snapshot: id,
      });
      setAlert("You recommended this Snapshot!", "success");
      setSnapshots((prevSnapshots) => ({
        ...prevSnapshots,
        results: prevSnapshots.results.map((snapshot) => {
          return snapshot.id === id
            ? {
                ...snapshot,
                recommendations_count: snapshot.recommendations_count + 1,
                recommendation_id: data.id,
              }
            : snapshot;
        }),
      }));
    } catch (err) {
      setAlert("sorry, something went wrong.  Try again later.", "warning");
      // console.log(err);
    }
  };

  // Function to handle removing a recommendation for a snapshot
  const handleUnrecommend = async () => {
    try {
      await axiosRes.delete(`/recommendations/${recommendation_id}/`);
      setAlert("You removed recommendation for this Snapshot!", "success");
      setSnapshots((prevSnapshots) => ({
        ...prevSnapshots,
        results: prevSnapshots.results.map((snapshot) => {
          return snapshot.id === id
            ? {
                ...snapshot,
                recommendations_count: snapshot.recommendations_count - 1,
                recommendation_id: null,
              }
            : snapshot;
        }),
      }));
    } catch (err) {
      // console.log(err);
      setAlert("sorry, something went wrong.  Try again later.", "warning");
    }
  };

  // Function to handle pinning a snapshot
  const handlePin = async () => {
    try {
      const { data } = await axiosRes.post("/pins/", {
        snapshot: id,
      });
      setAlert("You pinned the Snapshot!", "success");
      setSnapshots((prevSnapshots) => ({
        ...prevSnapshots,
        results: prevSnapshots.results.map((snapshot) => {
          return snapshot.id === id
            ? {
                ...snapshot,
                pin_id: data.id,
              }
            : snapshot;
        }),
      }));
    } catch (err) {
      // console.log(err);
      setAlert("sorry, something went wrong.  Try again later.", "warning");
    }
  };

  // Function to handle unpinning a snapshot
  const handleUnpin = async () => {
    try {
      await axiosRes.delete(`/pins/${pin_id}/`);
      setAlert("You unpinned the Snapshot!", "success");
      setSnapshots((prevSnapshots) => ({
        ...prevSnapshots,
        results: prevSnapshots.results.map((snapshot) => {
          return snapshot.id === id
            ? {
                ...snapshot,
                pin_id: null,
              }
            : snapshot;
        }),
      }));
      pinboard &&
        setSnapshots((prevSnapshots) => ({
          ...prevSnapshots,
          results: prevSnapshots.results.filter((snapshot) => snapshot.pin_id),
        }));
    } catch (err) {
      // console.log(err);
      setAlert("sorry, something went wrong.  Try again later.", "warning");
    }
  };

  return (
    <>
      <Card className={styles.Snapshot}>
        <Card.Body>
          <Media className="align-items-center justify-content-between">
            <Link to={`/profiles/${profile_id}`}>
              <Avatar src={profile_image} height={55} />
              {owner}
            </Link>
            <span>{updated_at}</span>
          </Media>
        </Card.Body>
        <Link to={`/snapshots/${id}`}>
          <Card.Img src={image} alt={title} />
        </Link>
        <Card.Body>
          {title && <Card.Title className="text-center">{title}</Card.Title>}
          {description && <Card.Text>{description}</Card.Text>}
          <div className="d-flex justify-content-between">
            <div className={!is_owner || !snapshotPage ? "m-auto" : "mr-auto"}>
              {currentUser ? (
                is_owner ? (
                  <OverlayTrigger
                    placement="top"
                    overlay={
                      <Tooltip>You can't recommend your own snapshot!</Tooltip>
                    }
                  >
                    <i
                      className={`fa-regular fa-thumbs-up ${styles.IconOutline}`}
                    />
                  </OverlayTrigger>
                ) : recommendation_id ? (
                  <span onClick={handleUnrecommend}>
                    <i
                      className={`fa-solid fa-thumbs-up ${styles.IconSolid}`}
                    />
                  </span>
                ) : (
                  <span onClick={handleRecommend}>
                    <i
                      className={`fa-regular fa-thumbs-up ${styles.IconOutline}`}
                    />
                  </span>
                )
              ) : (
                <OverlayTrigger
                  placement="top"
                  overlay={<Tooltip>Log in to recommend snapshots!</Tooltip>}
                >
                  <i className="fa-regular fa-thumbs-up" />
                </OverlayTrigger>
              )}
              {recommendations_count}

              {currentUser &&
                (pin_id ? (
                  <span onClick={handleUnpin}>
                    <i className={`fa-solid fa-bookmark ${styles.IconSolid}`} />
                  </span>
                ) : (
                  <span onClick={handlePin}>
                    <i
                      className={`fa-regular fa-bookmark ${styles.IconOutline}`}
                    />
                  </span>
                ))}

              <Link
                to={`/snapshots/${id}`}
                aria-label="Navigate to comments associated with this snapshot"
              >
                <i className={`far fa-comments ${styles.IconOutline}`} />
              </Link>
              {comments_count}
              {samples_count > 0 && !snapshotPage && (
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip>Samples available for this snapshot</Tooltip>
                  }
                >
                  <Link
                    to={`/snapshots/${id}`}
                    aria-label="Navigate to samples associated with this snapshot"
                  >
                    <img
                      src={Waveform}
                      alt="Audio Waveform"
                      height={45}
                      width={45}
                      className={`${appStyles.ImageIconClickable} ${styles.Waveform}`}
                    />
                  </Link>
                </OverlayTrigger>
              )}
            </div>
            {is_owner && snapshotPage && (
              <div>
                <EditDelete
                  handleEdit={handleEdit}
                  handleDelete={() => setShowModal(true)}
                />
              </div>
            )}
          </div>
        </Card.Body>
      </Card>
      <ModalPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title={"Delete Snapshot"}
        message={"Are you sure you want to delete this snapshot?"}
        buttonLabel={"Delete"}
      />
    </>
  );
};

export default Snapshot;
