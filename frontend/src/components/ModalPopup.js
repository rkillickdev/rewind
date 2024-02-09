import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import btnStyles from "../styles/Button.module.css";

// Referenced the following article when implementing Modal Popup:
//https://www.codu.co/articles/creating-a-pop-up-modal-dialog-in-bootstrap-react-xgeujzcj

const ModalPopup = ({
  show,
  handleClose,
  onConfirm,
  title,
  message,
  buttonLabel,
}) => {
  return (
    <Modal show={show} onHide={handleClose} onClose={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Highlight}`}
          onClick={handleClose}
        >
          Close
        </Button>
        <Button
          className={`${btnStyles.Button} ${btnStyles.Feature}`}
          onClick={onConfirm}
        >
          {buttonLabel}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalPopup;
