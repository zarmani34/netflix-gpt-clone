import axios from "axios";
import { apiKeys, genreApiUrl, options } from "./urls";
import { createContext, useEffect, useContext, useState } from "react";

const genreContext = createContext();

export const useGenreContext = () => useContext(genreContext);

export const GenreContextProvider = ({ children }) => {
  const [genreList, setGenreList] = useState([]);

  useEffect(() => {
    const fetchGenre = async () => {
      const genreUrl = genreApiUrl(apiKeys);
      try {
        const response = await axios({
          url: genreUrl,
          method: options.method,
          headers: options.headers,
        });
        setGenreList(response.data.genres); // Returns an array of genre objects
      } catch (error) {
        setGenreList([]);
      }
    };

    fetchGenre()
  }, []);

  return (
    <genreContext.Provider value={genreList}>{children}</genreContext.Provider>
  );
};
