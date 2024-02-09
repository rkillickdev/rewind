import Toast from "react-bootstrap/Toast";
import useAlert from "../hooks/useAlert";
import styles from "../styles/ToastPopup.module.css";
import { useEffect, useState } from "react";

const ToastPopup = () => {
  // Destructure text and type from the useAlert custom hook
  const { text, type } = useAlert();

  const [showToast, setShowToast] = useState(true);
  const toggleToast = () => setShowToast(!showToast);

  // useEffect hook with callback function that sets value of showToast to true
  // Callback function triggered whenever the useAlert function is called
  useEffect(() => {
    setShowToast(true);
  }, [useAlert()]);

  // If text and type is equal to the string 'success', render a Toast component
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
    // If text or type missing, render an empty fragment
    return <></>;
  }
};

export default ToastPopup;
