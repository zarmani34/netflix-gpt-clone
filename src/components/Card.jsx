import { posterPathUrl } from "@/utils/urls";
import React, { useState } from "react";
import { createPortal } from "react-dom";
import MovieDetails from "./MovieDeatils";

const Card = ({ result }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleCardClick = () => {
    setShowDetails(true);
  };

  return (
    <>
      <div 
        onClick={handleCardClick}
        className="w-36 h-48 sm:w-48 sm:h-52 lg:w-52 lg:h-64 m-auto border border-indigo-500 rounded-3xl flex-shrink-0 hover:scale-105 transition-all duration-300 ease-in-out cursor-pointer"
      >
        <img 
          className="w-full h-full rounded-3xl" 
          src={posterPathUrl(result.poster_path)} 
          alt="poster picture" 
        />
      </div>
      
      {showDetails && createPortal(
        <MovieDetails 
          movie={result} 
          onClose={() => setShowDetails(false)} 
        />,
        document.body
      )}
    </>
  );
};

export default Card;