import React from "react";
import styles from "../styles/Asset.module.css";
import { useHistory } from "react-router-dom/cjs/react-router-dom";

const EditDelete = ({ handleEdit, handleDelete }) => {
  return (
    <div>
      <span onClick={handleEdit}>
        <i className={"fas fa-edit"} aria-label="edit" />
      </span>
      <span onClick={handleDelete}>
        <i className={"fas fa-trash-alt"} aria-label="delete" />
      </span>
    </div>
  );
};

export const ProfileEditOptions = ({ id }) => {
  const history = useHistory();
  return (
    <div>
      <span
        onClick={() => history.push(`/profiles/${id}/edit`)}
        aria-label="edit-profile"
      >
        <i className={"fas fa-edit"} />
        edit profile
      </span>
      <span
        onClick={() => history.push(`/profiles/${id}/edit/username`)}
        aria-label="edit-username"
      >
        <i className={"far fa-id-card"} />
        change username
      </span>
      <span
        onClick={() => history.push(`/profiles/${id}/edit/password`)}
        aria-label="edit-password"
      >
        <i className={"fas fa-key"} />
        change password
      </span>
    </div>
  );
};

export default EditDelete;
