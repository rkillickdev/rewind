import React from "react";
import styles from "../styles/Asset.module.css";

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

export default EditDelete;
