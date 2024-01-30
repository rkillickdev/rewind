import { Toast } from "react-bootstrap";
import useAlert from "../hooks/useAlert";
import styles from "../styles/ToastPopup.module.css";
import { useEffect, useState } from "react";

const ToastPopup = () => {
  const { text, type } = useAlert();
  const [showToast, setShowToast] = useState(true);
  const toggleToast = () => setShowToast(!showToast);

  useEffect(() => {
    setShowToast(true);
  }, [useAlert()]);

  if (text && type === "success") {
    return (
      <Toast
        className={styles.ToastFixed}
        show={showToast}
        onClose={toggleToast}
        delay={3000}
        autohide
      >
        <Toast.Header>
          <i className="fa-solid fa-circle-check"></i>
          <strong className="mr-auto">Job done</strong>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    );
  } else {
    return <></>;
  }
};

export default ToastPopup;
