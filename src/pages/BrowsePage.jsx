import { useLoaderData, useLocation, useParams } from "react-router-dom";
import TrailerPlayback from "@/components/TrailerPlayback";
import Card from "@/components/Card";
import Tittle from "@/components/Tittle";
import { useEffect, useRef, useState } from "react";
import MovieDeatils from "@/components/MovieDeatils";

const Browse = () => {
  const { data, officialTrailer } = useLoaderData();
  const { browsePage } = useParams();

  return (
    <div className="bg-gradient-to-b from-indigo-400 to-gray-900 w-full h-full">
      <div className="w-full h-full relative">
        <TrailerPlayback officialTrailer={officialTrailer} />
        <div className="absolute left-5 bottom-5 w-[60%] h-[50%] overflow-hidden sm:bottom-2 sm:left-2">
          <h2 className="text-lg font-bold text-indigo-600 sticky top-0 sm:text-3xl">{data.results[0].original_title || data.results[0].name}</h2>
          <p className="text-indigo-50 text-sm  w-full h-[70%] overflow-y-scroll sm:text-xl sm:w-[80%]">{data.results[0].overview}</p>
        </div>
      </div>
      <Tittle>{browsePage ? browsePage : "Trending Movies"}</Tittle>
      <div className="flex items-center gap-4 justify-middle flex-wrap flex-grow flex-shrink-0">
        {data.results.map((item) => (
            <Card
              key={item.id}
              result={item}
            />

        ))}
      </div>
    </div>
  );
};

export default Browse;