import React, { useState } from "react";
import { Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Sample.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import EditDelete from "../../components/EditDelete";
import { axiosRes } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";

const Sample = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    created_at,
    audio,
    approved,
    id,
    setSnapshot,
    setSamples,
  } = props;

  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { setAlert } = useAlert();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/samples/${id}/`);
      setAlert("You deleted your sample", "success");
      setSnapshot((prevSnapshot) => ({
        results: [
          {
            ...prevSnapshot.results[0],
            samples_count: prevSnapshot.results[0].samples_count - 1,
          },
        ],
      }));

      setSamples((prevSamples) => ({
        ...prevSamples,
        results: prevSamples.results.filter((sample) => sample.id !== id),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <hr />
      <Media className={!approved && styles.Pending}>
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
        </Link>
        <Media.Body className="align-self-center ml-2">
          <span className={styles.Owner}>{owner}</span>
          <span className={styles.Date}>{created_at}</span>
          <audio src={audio} controls />
        </Media.Body>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Your sample is pending approval</Tooltip>}
        >
          {!approved && <i className="fa-solid fa-stamp"></i>}
        </OverlayTrigger>

        {is_owner && <EditDelete handleDelete={handleDelete} />}
      </Media>
    </>
  );
};

export default Sample;
