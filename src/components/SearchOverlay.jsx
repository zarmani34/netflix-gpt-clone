import React, { useEffect, useState } from "react";
import { FaArrowLeft } from "react-icons/fa";

import { apiKeys, options } from "@/utils/urls";
import axios from "axios";
import Card from "./Card";
import Spinner from "./Spinner";
import Tittle from "./Tittle";
import SubTittle from "./SubTittle";

const SearchOverlay = ({ closeOverlay, searchInputText, aiMovieResult }) => {
  const [movieData, setMovieData] = useState([]);

  useEffect(() => {
    if (aiMovieResult && aiMovieResult.length > 0) {
      handleAiMovieSearch();
    }
  }, [aiMovieResult]);

  const tmdbMovieSearch = async (movie) => {
    try {
      const response = await axios({
        url: `https://api.themoviedb.org/3/search/movie?query=${movie}&include_adult=false&language=en-US&page=1&api_key=${apiKeys}`,
        method: options.method,
        headers: options.headers,
      });

      if (response.data.results && response.data.results.length > 0) {
        return response.data.results;
      }
      return [];
    } catch (error) {
      console.error(`Error searching for movie "${movie}":`, error);
      return [];
    }
  };

  const handleAiMovieSearch = async () => {
    const searchResult = aiMovieResult.map((movie) => tmdbMovieSearch(movie));
    const searchResults = await Promise.all(searchResult);
    setMovieData(searchResults);
  };

  return (
    <div className="absolute bg-gradient-to-b from-indigo-400/90 to-gray-900 top-full left-0 w-full h-screen overflow-y-scroll">
      <div className="flex items-center justify-left gap-4 text-indigo-50 text-2xl p-2">
        <div onClick={() => closeOverlay()} className="cursor-pointer">
          <FaArrowLeft />
        </div>
        <p>
          search result for "
          <strong className="text-indigo-900">{searchInputText}</strong>"
        </p>
      </div>
      {movieData.length > 0 ? (
        <div className="bg-red">
          {aiMovieResult.map((movieName, index) => (
            <div key={movieName} className="p-2">
              <SubTittle>{movieName}</SubTittle>
              <div className="flex items-center gap-2 overflow-x-scroll scrollbar-hide">
                {movieData.length > 0 &&
                  movieData[index]?.map((movie) => (
                    <div>
                      <Card result={movie} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-indigo-200">
          <Spinner color={"#c7d2fe"} />
          <p className="text-indigo-200 text-xl p-4 text-center">
            Please excercise patient, Searching for:{" "}
            <strong className="text-indigo-900">{searchInputText}</strong>
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchOverlay;
