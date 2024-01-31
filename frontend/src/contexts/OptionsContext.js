import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

export const OptionsContext = createContext();
export const SetOptionsContext = createContext();

export const useOptions = () => useContext(OptionsContext);
export const useSetOptions = () => useContext(SetOptionsContext);

export const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState({
    genres: [],
    eras: [],
    categories: [],
  });

  useEffect(() => {
    const fetchSnapshotOptions = async () => {
      try {
        const [{ data: genres }, { data: eras }, { data: categories }] =
          await Promise.all([
            axiosReq.get("/genres/"),
            axiosReq.get("/eras/"),
            axiosReq.get("/categories/"),
          ]);
        setOptions((prevState) => ({
          ...prevState,
          genres: genres.results,
          eras: eras.results,
          categories: categories.results,
        }));
      } catch (err) {
        // console.log(err);
      }
    };

    fetchSnapshotOptions();
  }, []);

  return (
    <OptionsContext.Provider value={options}>
      <SetOptionsContext.Provider value={setOptions}>
        {children}
      </SetOptionsContext.Provider>
    </OptionsContext.Provider>
  );
};
