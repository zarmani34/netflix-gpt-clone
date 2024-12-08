import { useEffect, useState } from "react";
import { useTrendingContext } from "../utils/TrendingContext";
import Card from "./Card";
import ShimmerUI from "./ShimmerUI";
import Tittle from "./Tittle";

const TrendingMovies = () => {
  const [loadShimmer, setLoadShimmer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let trendingMovies = useTrendingContext();
  useEffect(() => {
    if (isLoading) {
      setLoadShimmer(Array(20).fill(null)); // Create an array of 20 items for the shimmer
    }
  }, [isLoading]);
  useEffect(() => {
    if (trendingMovies) {
      setIsLoading(false);
    }
  }, [trendingMovies]);


  return (
    <>
    <Tittle>
      Trending
    </Tittle>
      <div className=" mb-4 flex flex-row align-middle justify-middle flex-nowrap overflow-x-scroll overflow-y-hidden scrollbar-hide">
        {isLoading
          ? loadShimmer.map((_, index) => (
                <ShimmerUI key={index} />
            ))
          :
        trendingMovies?.results?.map((result) => (
          <Card key={result.id} result={result} />
        ))}
      </div>
    </>
  );
};

export default TrendingMovies;
