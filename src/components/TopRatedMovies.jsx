import { useEffect, useState } from "react";
import { useTopRatedContext } from "../utils/TopRatedContext";
import Card from "./Card";
import ShimmerUI from "./ShimmerUI";
import Tittle from "./Tittle";

const TopRatedMovies = () => {
  const [loadShimmer, setLoadShimmer] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  let topRatedMovies = useTopRatedContext();
  useEffect(() => {
    if (isLoading) {
      setLoadShimmer(Array(20).fill(null)); 
    }
  }, [isLoading]);
  useEffect(() => {
    if (topRatedMovies) {
      setIsLoading(false);
    }
  }, [topRatedMovies]);

  return (
    <>
    <Tittle>
      Top rated Movies
    </Tittle>
      <div className="mb-4 flex flex-row align-middle justify-middle flex-nowrap overflow-x-scroll overflow-y-hidden scrollbar-hide">
        {isLoading
          ? loadShimmer.map((_, index) => <ShimmerUI key={index} />)
          : topRatedMovies?.results?.map((result) => (
              <Card key={result.id} result={result} />
            ))}
      </div>
    </>
  );
};

export default TopRatedMovies;
