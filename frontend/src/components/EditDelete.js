import React from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";

import appStyles from "../App.module.css";

const EditDelete = ({ handleEdit, handleDelete }) => {
  return (
    <div>
      {/* Rendered if handleEdit prop passed */}
      {handleEdit && (
        <span onClick={handleEdit}>
          <i className={"fas fa-edit"} aria-label="edit" />
        </span>
      )}
      {/* Rendered if handleDelete prop passed */}
      {handleDelete && (
        <span onClick={handleDelete}>
          <i className={"fas fa-trash-alt"} aria-label="delete" />
        </span>
      )}
    </div>
  );
};

export const ProfileEditOptions = ({ id }) => {
  const history = useHistory();
  return (
    <div className="mx-auto mt-4 d-flex flex-column">
      <h1 className={`h3 ${appStyles.FeatureHeading}`}>Update Your Details</h1>
      <div>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Edit Profile</Tooltip>}
        >
          <span
            className="p-2"
            onClick={() => history.push(`/profiles/${id}/edit`)}
            aria-label="edit-profile"
          >
            <i className={"fas fa-edit"} />
          </span>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Edit Username</Tooltip>}
        >
          <span
            className="p-2"
            onClick={() => history.push(`/profiles/${id}/edit/username`)}
            aria-label="edit-username"
          >
            <i className={"far fa-id-card"} />
          </span>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip>Change Password</Tooltip>}
        >
          <span
            className="p-2"
            onClick={() => history.push(`/profiles/${id}/edit/password`)}
            aria-label="edit-password"
          >
            <i className={"fas fa-key"} />
          </span>
        </OverlayTrigger>
      </div>
    </div>
  );
};

export default EditDelete;
