import { createContext, useState } from "react";

// This code was referenced from the following article:
// https://dev.to/jeffreythecoder/set-up-react-global-alert-popup-in-10mins-36l3

const ALERT_TIME = 5000;
const initialState = {
  text: "",
  type: "",
};

// Create context for AlertPopup and pass initial state
const AlertContext = createContext({
  ...initialState,
  setAlert: () => {},
});

// Provider component to manage alerts when setAlert function called
export const AlertProvider = ({ children }) => {
  const [text, setText] = useState("");
  const [type, setType] = useState("");

  const setAlert = (text, type) => {
    setText(text);
    setType(type);

    // Clear alert after 4 seconds
    setTimeout(() => {
      setText("");
      setType("");
    }, ALERT_TIME);
  };

  return (
    // Pass text, type, and setAlert function  down component tree to children
    <AlertContext.Provider
      value={{
        text,
        type,
        setAlert,
      }}
    >
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;
