import { createContext, useContext, useEffect, useState } from "react";
import { apiKeys, options } from "../utils/urls";


export const TopRatedContext = createContext();
export const useTopRatedContext = () =>  useContext(TopRatedContext)

export const TopRatedContextProvider = ({ children }) => {
  const [topRatedMovies, seTopRatedMovies] = useState(null);
  

  useEffect(() => {
    
    const trending = async () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeys}&language=en-US&page=1`;
      try {
        const res = await fetch(apiUrl, options);
        const data = await res.json();
        seTopRatedMovies(data);
      } catch (error) {
        throw new Error(error);
      }
    };
    trending();
  }, []);

  return (
    
    <TopRatedContext.Provider value={topRatedMovies}>
      {children}
    </TopRatedContext.Provider>
  );
};
