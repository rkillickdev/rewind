import { Alert } from "react-bootstrap";
import useAlert from "../hooks/useAlert";
import styles from "../styles/AlertPopup.module.css";

const AlertPopup = () => {
  const { text, type } = useAlert();

  if (text && type) {
    return (
      <Alert className={styles.AlertFixed} variant={type}>
        {text}
      </Alert>
    );
  } else {
    return <></>;
  }
};

export default AlertPopup;
