import { createContext, useContext, useEffect, useState } from "react";
import { apiKeys } from "../utils/urls";


export const TopRatedContext = createContext();
export const useTopRatedContext = () =>  useContext(TopRatedContext)

export const TopRatedContextProvider = ({ children }) => {
  const [topRatedMovies, seTopRatedMovies] = useState(null);
  

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
      const apiUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKeys}&language=en-US&page=1`;
      try {
        const res = await fetch(apiUrl, options);
        const data = await res.json();
        seTopRatedMovies(data);
      } catch (error) {
        throw new error(error);
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
