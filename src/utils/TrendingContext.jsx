import { createContext, useContext, useEffect, useState } from "react";
import { apiKeys } from "../utils/urls";


const TrendingContext = createContext();
export const useTrendingContext = () =>  useContext(TrendingContext)

export const TrendingContextProvider = ({ children }) => {
  const [trendingMovies, setTrendingMovies] = useState(null);
  

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDJlNDU0NTFkNjllYzg4MjliOWVmMTkzNDI5YzZhOSIsIm5iZiI6MTczMjc4NjAyOC4zODYyNjgsInN1YiI6IjY3NDgzMWE0MmE1NjIyYjEwNTcxNzhjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YQYfrD3oIy_4BeJJx4hFFB7dLfwedMgwo_jzr0XqqxA",
      },
    };

    const trending = async () => {
      const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeys}&language=en-US&page=1`;
      try {
        const res = await fetch(apiUrl, options);
        const data = await res.json();
        setTrendingMovies(data);
        console.log(data);
        console.log(trendingMovies);
      } catch (error) {
        console.log("Error fetching data:", error);
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
