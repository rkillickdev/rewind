import { createContext, useContext, useEffect, useState } from "react";
import { axiosReq } from "../api/axiosDefaults";

// Context for options and setting options.  Options refers to genre, era and category.
export const OptionsContext = createContext();
export const SetOptionsContext = createContext();

// Custom hooks for accessing options and setting options
export const useOptions = () => useContext(OptionsContext);
export const useSetOptions = () => useContext(SetOptionsContext);

// Provider component to pass options context to children
export const OptionsProvider = ({ children }) => {
  const [options, setOptions] = useState({
    genres: [],
    eras: [],
    categories: [],
  });

  useEffect(() => {
    // Retrieves details of options and sets state
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
    // Call fetchSnapshotOptions function on component mount
    fetchSnapshotOptions();
  }, []);

  return (
    // Return providers so child components can access
    <OptionsContext.Provider value={options}>
      <SetOptionsContext.Provider value={setOptions}>
        {children}
      </SetOptionsContext.Provider>
    </OptionsContext.Provider>
  );
};
