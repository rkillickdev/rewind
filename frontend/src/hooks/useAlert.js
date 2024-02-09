import { useContext } from "react";
import AlertContext from "../contexts/AlertContext";

/*
  Custom hook that uses the AlertContext and can be called
  throughout the app to provide alert functionality when
  required.
*/

const useAlert = () => useContext(AlertContext);

export default useAlert;
