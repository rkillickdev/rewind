import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import { axiosReq, axiosRes } from "../api/axiosDefaults";
import { useHistory } from "react-router-dom";
import { removeTokenTimestamp, shouldRefreshToken } from "../utils/utils";
import useAlert from "../hooks/useAlert";

/* 
  Code for CurrentUserContext based on Code Institute Moments walk through project.
  Creation of user context enables access to user details throughout the app.
  Axios interceptors are included to refresh tokens.
*/

// Context for current user and setting current user
export const CurrentUserContext = createContext();
export const SetCurrentUserContext = createContext();

// Custom hooks for accessing current user and setting current user
export const useCurrentUser = () => useContext(CurrentUserContext);
export const useSetCurrentUser = () => useContext(SetCurrentUserContext);

// Provider component to pass current user context to children
export const CurrentUserProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  const { setAlert } = useAlert();

  const handleMount = async () => {
    // Retrieves details of current user and sets state
    try {
      const { data } = await axiosRes.get("/dj-rest-auth/user/");
      setCurrentUser(data);
    } catch (err) {
      // console.log(err);
      setAlert("sorry, something went wrong.  Try again later.", "warning");
    }
  };

  useEffect(() => {
    handleMount();
  }, []);

  useMemo(() => {
    // Create request interceptor
    axiosReq.interceptors.request.use(
      async (config) => {
        if (shouldRefreshToken()) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
            return config;
          }
        }
        return config;
      },
      (err) => {
        return Promise.reject(err);
      },
    );

    // Create response interceptor
    axiosRes.interceptors.response.use(
      (response) => response,
      async (err) => {
        if (err.response?.status === 401) {
          try {
            await axios.post("/dj-rest-auth/token/refresh/");
          } catch (err) {
            setCurrentUser((prevCurrentUser) => {
              if (prevCurrentUser) {
                history.push("/signin");
              }
              return null;
            });
            removeTokenTimestamp();
          }
          return axios(err.config);
        }
        return Promise.reject(err);
      },
    );
  }, [history]);

  return (
    // Return providers so child components can access
    <CurrentUserContext.Provider value={currentUser}>
      <SetCurrentUserContext.Provider value={setCurrentUser}>
        {children}
      </SetCurrentUserContext.Provider>
    </CurrentUserContext.Provider>
  );
};
