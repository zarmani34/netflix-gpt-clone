import { TopRatedContextProvider } from "../utils/TopRatedContext";
import { TrendingContextProvider } from "../utils/TrendingContext";
import TopRatedMovies from "./TopRatedMovies";
import TrendingMovies from "./TrendingMovies";

const MovieShowcase = () => {
  return (
    <div className="w-full p-4 relative text-slate-700 text-xl z-50 bg-gradient-to-b from-[rgb(98,73,79)] to-black">
      <TrendingContextProvider>
        <TrendingMovies />
      </TrendingContextProvider>
      <TopRatedContextProvider>
        <TopRatedMovies />
      </TopRatedContextProvider>
    </div>
  );
};

export default MovieShowcase;
