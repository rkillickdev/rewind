import React, { useState } from "react";
import { Media, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Sample.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import EditDelete from "../../components/EditDelete";
import { axiosRes } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";
import ModalPopup from "../../components/ModalPopup";
import Waveform from "../../assets/sound-waves.png";

const Sample = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    audio,
    approved,
    id,
    setSnapshot,
    setSamples,
  } = props;

  const [showModal, setShowModal] = useState(false);
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
      <Media
        className={`${
          !approved && styles.Pending
        } d-flex justify-content-between`}
      >
        <Link to={`/profiles/${profile_id}`}>
          <Avatar src={profile_image} />
          <span className={`${styles.Owner} align-self-center ml-2`}>
            {owner}
          </span>
          <img src={Waveform} alt="Audio Waveform" height={45} width={45} />
        </Link>
        <audio src={audio} controls />
        <div className="d-flex">
          {!approved && is_owner ? (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Your sample is pending approval</Tooltip>}
            >
              <i className="fa-solid fa-circle-xmark"></i>
            </OverlayTrigger>
          ) : (
            <OverlayTrigger
              placement="top"
              overlay={<Tooltip>Your sample is pending approval</Tooltip>}
            >
              <i className="fa-solid fa-circle-check"></i>
            </OverlayTrigger>
          )}

          {is_owner && <EditDelete handleDelete={() => setShowModal(true)} />}
        </div>
      </Media>
      <ModalPopup
        show={showModal}
        handleClose={() => setShowModal(false)}
        onConfirm={handleDelete}
        title={"Delete Sample"}
        message={"Are you sure you want to delete this sample?"}
        buttonLabel={"Delete"}
      />
    </>
  );
};

export default Sample;
