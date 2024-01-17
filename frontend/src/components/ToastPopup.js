import { Toast } from "react-bootstrap";
import useAlert from "../hooks/useAlert";
import styles from "../styles/ToastPopup.module.css";

const ToastPopup = () => {
  const { text, type } = useAlert();

  if (text && type === "success") {
    return (
      <Toast className={styles.ToastFixed}>
        <Toast.Header>
          <i className="fa-solid fa-circle-check mr-auto"></i>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    );
  } else {
    return <></>;
  }
};

export default ToastPopup;
