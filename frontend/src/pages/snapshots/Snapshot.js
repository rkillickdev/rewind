import React from "react";
import styles from "../../styles/Snapshot.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";
import EditDelete from "../../components/EditDelete";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const Snapshot = (props) => {
  const {
    id,
    owner,
    profile_id,
    profile_image,
    created_at,
    updated_at,
    title,
    description,
    image,
    soundbyte,
    era,
    genre,
    category,
    recommendation_id,
    pin_id,
    comments_count,
    recommendations_count,
    snapshotPage,
    setSnapshots,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const history = useHistory();

  const handleEdit = () => {
    history.push(`/snapshots/${id}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/snapshots/${id}/`);
      history.goBack();
    } catch (err) {
      console.log(err);
    }
  };
  const handleRecommend = async () => {
    try {
      const { data } = await axiosRes.post("/recommendations/", {
        snapshot: id,
      });
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
      console.log(err);
    }
  };

  const handleUnrecommend = async () => {
    try {
      await axiosRes.delete(`/recommendations/${recommendation_id}/`);
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
      console.log(err);
    }
  };

  const handlePin = async () => {
    try {
      const { data } = await axiosRes.post("/pins/", {
        snapshot: id,
      });
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
      console.log(err);
    }
  };

  const handleUnpin = async () => {
    try {
      await axiosRes.delete(`/pins/${pin_id}/`);
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
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card className={styles.Snapshot}>
      <Card.Body>
        <Media className="align-items-center justify-content-between">
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} height={55} />
            {owner}
          </Link>
          <div className="d-flex align-items-center">
            <span>{updated_at}</span>
          </div>
        </Media>
      </Card.Body>
      <Link to={`/snapshots/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={`d-flex justify-content-between ${styles.PostBar}`}>
          <div>
            {is_owner ? (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>You can't like your own post!</Tooltip>}
              >
                <i className="fa-regular fa-thumbs-up" />
              </OverlayTrigger>
            ) : recommendation_id ? (
              <span onClick={handleUnrecommend}>
                <i className={`fa-solid fa-thumbs-up ${styles.Heart}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handleRecommend}>
                <i
                  className={`fa-regular fa-thumbs-up ${styles.HeartOutline}`}
                />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to like snapshots!</Tooltip>}
              >
                <i className="far fa-heart" />
              </OverlayTrigger>
            )}
            {recommendations_count}
            {pin_id ? (
              <span onClick={handleUnpin}>
                <i className={`fa-solid fa-bookmark ${styles.Heart}`} />
              </span>
            ) : currentUser ? (
              <span onClick={handlePin}>
                <i
                  className={`fa-regular fa-bookmark ${styles.HeartOutline}`}
                />
              </span>
            ) : (
              <OverlayTrigger
                placement="top"
                overlay={<Tooltip>Log in to pin a snapshot!</Tooltip>}
              >
                <i className="fa-regular fa-bookmark" />
              </OverlayTrigger>
            )}
            <Link to={`/snapshots/${id}`}>
              <i className="far fa-comments" />
            </Link>
            {comments_count}
          </div>
          <div>
            {is_owner && snapshotPage && (
              <EditDelete handleEdit={handleEdit} handleDelete={handleDelete} />
            )}
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Snapshot;
