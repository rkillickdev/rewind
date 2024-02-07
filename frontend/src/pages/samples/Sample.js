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
import Pending from "../../assets/pending.png";

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
        } d-flex justify-content-between align-items-center text-center`}
      >
        {!approved && is_owner ? (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip>Your sample is awaiting approval</Tooltip>}
          >
            <img
              src={Pending}
              alt="Pending Icon"
              className="mx-2"
              height={45}
              width={45}
            />
          </OverlayTrigger>
        ) : (
          <img
            src={Waveform}
            alt="Audio Waveform"
            className="mx-2"
            height={45}
            width={45}
          />
        )}
        <audio src={audio} className="px-2" controls />
        {is_owner ? (
          <EditDelete handleDelete={() => setShowModal(true)} />
        ) : (
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
            <span className={`${styles.Owner} align-self-center ml-2`}>
              {owner}
            </span>
          </Link>
        )}
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
