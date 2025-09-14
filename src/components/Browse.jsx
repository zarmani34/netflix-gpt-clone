import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiKeys, options } from "@/utils/urls";
import { Volume2, VolumeX } from "lucide-react";

const Browse = () => {
  const [trailerKey, setTrailerKey] = useState(null);
  const [isMuted, setIsMuted] = useState(true);
  const apiUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKeys}&language=en-US&page=1`;

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    
    
    axios({
      url: apiUrl,
      method: options.method,
      headers: options.headers,
    })
      .then((response) => {
        
        const trailerId = response.data.results[0]?.id;
        if (trailerId) {
          const trailerUrl = `https://api.themoviedb.org/3/movie/${trailerId}/videos?api_key=${apiKeys}&language=en-US`;
          return axios({
            url: trailerUrl,
            method: options.method,
            headers: options.headers,
          });
        }
        throw new Error("No movies found in the response.");
        
      })
      .then((trailerData) => {
        const trailers = trailerData.data.results;
        const officialTrailer = trailers.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        if (officialTrailer) {
          setTrailerKey(officialTrailer.key);
        } else {
          throw new Error("No trailer found for the movie.");
        }
      })
      .catch((error) => {
        console.error(error)
      });
  }, [apiUrl]);

  return (
    <div className="relative top-0 left-0 w-full h-screen overflow-hidden ">
      {trailerKey ? (
        <div className="absolute inset-0">
          <div className="relative w-full h-full">
            <iframe
              className="absolute w-full h-full scale-150"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&showinfo=0&rel=0&loop=1&playlist=${trailerKey}&modestbranding=1`}
              title="Background video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            {/* Optional overlay to help video blend with content */}
            {/* <div className="absolute inset-0 bg-black/30"></div> */}
          </div>
        </div>
      ) : (
        <div className="w-full h-full bg-black"></div>
      )}
       <button
        onClick={toggleMute}
        className="absolute bottom-24 right-8 z-50 p-3 bg-black/50 hover:bg-black/70 rounded-full transition-colors duration-200"
      >
        {isMuted ? (
          <VolumeX className="w-6 h-6 text-white" />
        ) : (
          <Volume2 className="w-6 h-6 text-white" />
        )}
      </button>
      
      
    </div>
  );
};

export default Browse;