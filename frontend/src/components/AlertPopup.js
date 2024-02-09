import Alert from "react-bootstrap/Alert";
import useAlert from "../hooks/useAlert";

import styles from "../styles/AlertPopup.module.css";

const AlertPopup = () => {
  // Destructure text and type from the useAlert custom hook
  const { text, type } = useAlert();

  // If text and type exist, render an Alert component
  if (text && type === "warning") {
    return (
      <Alert className={styles.AlertFixed} variant={type}>
        {text}
      </Alert>
    );
  } else {
    // If text or type missing, render an empty fragment
    return <></>;
  }
};

export default AlertPopup;
