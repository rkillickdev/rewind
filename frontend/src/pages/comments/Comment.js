import React, { useState } from "react";
import { Media } from "react-bootstrap";
import { Link } from "react-router-dom/cjs/react-router-dom";
import Avatar from "../../components/Avatar";
import styles from "../../styles/Comment.module.css";
import { useCurrentUser } from "../../contexts/CurrentUserContext";
import EditDelete from "../../components/EditDelete";
import { axiosRes } from "../../api/axiosDefaults";
import useAlert from "../../hooks/useAlert";
import CommentEditForm from "./CommentEditForm";
import ModalPopup from "../../components/ModalPopup";
import CommentBubble from "../../assets/chat.png";

const Comment = (props) => {
  const {
    profile_id,
    profile_image,
    owner,
    updated_at,
    content,
    id,
    setSnapshot,
    setComments,
  } = props;

  const [showModal, setShowModal] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const currentUser = useCurrentUser();
  const is_owner = currentUser?.username === owner;
  const { setAlert } = useAlert();

  const handleDelete = async () => {
    try {
      await axiosRes.delete(`/comments/${id}/`);
      setAlert("You deleted your comment", "success");
      setSnapshot((prevSnapshot) => ({
        results: [
          {
            ...prevSnapshot.results[0],
            comments_count: prevSnapshot.results[0].comments_count - 1,
          },
        ],
      }));

      setComments((prevComments) => ({
        ...prevComments,
        results: prevComments.results.filter((comment) => comment.id !== id),
      }));
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <>
      <hr />
      <Media>
        <img src={CommentBubble} alt="Comment Bubble" height={45} width={45} />
        <Media.Body className="align-self-center ml-2 text-center">
          {!is_owner && (
            <>
              <div className="mb-3">
                <span className={styles.Owner}>{owner}</span>
                <span className={styles.Date}>{updated_at}</span>
              </div>
            </>
          )}
          {showEditForm ? (
            <CommentEditForm
              id={id}
              profile_id={profile_id}
              content={content}
              profileImage={profile_image}
              setComments={setComments}
              setShowEditForm={setShowEditForm}
            />
          ) : (
            <p>{content}</p>
          )}
        </Media.Body>
        {is_owner && !showEditForm ? (
          <EditDelete
            handleEdit={() => setShowEditForm(true)}
            handleDelete={() => setShowModal(true)}
          />
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
        title={"Delete Comment"}
        message={"Are you sure you want to delete this comment?"}
        buttonLabel={"Delete"}
      />
    </>
  );
};

export default Comment;
