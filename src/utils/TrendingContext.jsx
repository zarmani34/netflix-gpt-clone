import { createContext, useContext, useEffect, useState } from "react";
import { apiKeys, options } from "../utils/urls";


const TrendingContext = createContext();
export const useTrendingContext = () =>  useContext(TrendingContext)

export const TrendingContextProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  

  useEffect(() => {

    const trending = async () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeys}&language=en-US&page=1`;
      try {
        const res = await fetch(apiUrl, options);
        const data = await res.json();
        setTrendingMovies(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    trending();
  }, []);

  return (
    
    <TrendingContext.Provider value={trendingMovies}>
      {children}
    </TrendingContext.Provider>
  );
};
