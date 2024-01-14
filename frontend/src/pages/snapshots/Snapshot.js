import React from "react";
import styles from "../../styles/Snapshot.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import { Card, Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import Avatar from "../../components/Avatar";
import { axiosRes } from "../../api/axiosDefaults";

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
  console.log(currentUser);
  const is_owner = currentUser?.username === owner;
  console.log(is_owner);

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
            {is_owner && snapshotPage && "..."}
          </div>
        </Media>
      </Card.Body>
      <Link to={`/snapshots/${id}`}>
        <Card.Img src={image} alt={title} />
      </Link>
      <Card.Body>
        {title && <Card.Title className="text-center">{title}</Card.Title>}
        {description && <Card.Text>{description}</Card.Text>}
        <div className={styles.PostBar}>
          {is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>You can't like your own post!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          ) : recommendation_id ? (
            <span onClick={handleUnrecommend}>
              <i className={`fas fa-heart ${styles.Heart}`} />
            </span>
          ) : currentUser ? (
            <span onClick={handleRecommend}>
              <i className={`far fa-heart ${styles.HeartOutline}`} />
            </span>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Log in to like posts!</Tooltip>}
            >
              <i className="far fa-heart" />
            </OverlayTrigger>
          )}
          {recommendations_count}
          <Link to={`/snapshots/${id}`}>
            <i className="far fa-comments" />
          </Link>
          {comments_count}
        </div>
      </Card.Body>
    </Card>
  );
};

export default Snapshot;
