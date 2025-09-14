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
      <div className="space-x-4 mb-4 flex flex-row align-middle justify-middle flex-nowrap overflow-y-visible overflow-x-scroll  scrollbar-hide py-4">
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
