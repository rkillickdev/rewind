import React, { useState } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom";

import Media from "react-bootstrap/Media";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import styles from "../../styles/Sample.module.css";
import Waveform from "../../assets/sound-waves.png";
import Pending from "../../assets/pending.png";

import { axiosRes } from "../../api/axiosDefaults";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import useAlert from "../../hooks/useAlert";
import Avatar from "../../components/Avatar";
import EditDelete from "../../components/EditDelete";
import ModalPopup from "../../components/ModalPopup";

const Sample = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    audio,
    created_at,
    approved,
    id,
    setSnapshot,
    setSamples,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { setAlert } = useAlert();

  // Function to handle deleting a comment
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
      {/* Apply pending style if sample not approved */}
      <Media
        className={`${
          !approved && styles.Pending
        } d-flex justify-content-between align-items-center text-center`}
      >
        {/* Display icon based on approved status */}
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
        <Media.Body className="align-self-center ml-2 text-center">
          {/* Show name of sample owner /created date if logged in user does not own */}
          {!is_owner && (
            <>
              <div className="mb-3">
                <span className={styles.Owner}>{owner}</span>
                <span className={styles.Date}>{created_at}</span>
              </div>
            </>
          )}
          <audio src={audio} className="px-2" controls />
        </Media.Body>
        {/* Display delete icon or Avatar dependent on owner status */}
        {is_owner ? (
          <EditDelete handleDelete={() => setShowModal(true)} />
        ) : (
          <Link to={`/profiles/${profile_id}`}>
            <Avatar src={profile_image} />
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
