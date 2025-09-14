import { apiKeys, genreApiUrl, options, posterPathUrl, trailerApiUrl } from "@/utils/urls";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import TrailerPlayback from "./TrailerPlayback";
import Spinner from "./Spinner";
import Tittle from "./Tittle";
import { useGenreContext } from "@/utils/GenreContext";
import { X } from "lucide-react"; // for close icon

const trailerCache = new Map();

const MovieDetails = ({ movie, onClose }) => {
  const [officialTrailer, setOfficialTrailer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [genre, setGenre] = useState([]);
  const genres = useGenreContext();
  const modalRef = useRef(null);

  const getGenreName = (...genreId) => {
    const genreNames = genres.reduce((acc, curr) => {
      if (genreId.includes(curr.id)) {
        acc.push(curr.name);
      }
      return acc;
    }, []);
    setGenre(genreNames);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  useEffect(() => {
    if (!movie.id) return;
    const trailerId = movie.id;
    const trailerUrl = trailerApiUrl(trailerId, apiKeys);

    const fetchMovieTrailer = async () => {
      try {
        if (trailerCache.has(trailerId)) {
          const cachedTrailer = trailerCache.get(movie.id);
          setOfficialTrailer(cachedTrailer);
          setLoading(false);
          return;
        }
        const trailerData = await axios({
          url: trailerUrl,
          method: options.method,
          headers: options.headers,
        });
        const trailer = trailerData.data.results;
        const trailerVideo = trailer.find(
          (video) => video.type === "Trailer" && video.site === "YouTube"
        );
        trailerCache.set(trailerId, trailerVideo?.key);
        setOfficialTrailer(trailerVideo?.key);
      } catch (error) {
        console.error("Error fetching trailer:", error);
        setLoading(false);
        setOfficialTrailer(undefined);
      } finally {
        setLoading(false);
      }
    };

    fetchMovieTrailer();
    getGenreName(...movie.genre_ids);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center z-50 p-3 bg-black/70 backdrop-blur-sm">
      <div
        ref={modalRef}
        className="relative w-full max-w-3xl max-h-[80vh] overflow-y-auto scrollbar-hide rounded-2xl shadow-2xl bg-gradient-to-b from-indigo-400 to-gray-900 text-slate-50 transition-all duration-300"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 rounded-full bg-black/40 hover:bg-black/60 transition"
        >
          <X size={20} className="text-white" />
        </button>

        {loading ? (
          <div className="flex items-center justify-center h-[60vh]">
            <Spinner />
          </div>
        ) : (
          <div className="flex flex-col gap-6 p-4 sm:p-6">
            {/* Top Section */}
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Poster */}
              <div className="w-2/3 sm:w-1/3 md:w-1/4 flex-shrink-0">
                <img
                  className="w-full rounded-xl shadow-lg object-cover"
                  src={posterPathUrl(movie.poster_path)}
                  alt={movie.title}
                />
              </div>

              {/* Details */}
              <div className="flex-1 space-y-3 text-center sm:text-left">
                <Tittle>{movie.title || movie.name}</Tittle>
                <p className="text-gray-300 text-sm">{movie.release_date}</p>
                <p className="text-gray-100 leading-relaxed text-sm sm:text-base">
                  {movie.overview}
                </p>

                {/* Genre Tags */}
                <div className="mt-3 flex flex-wrap gap-2 justify-center sm:justify-start">
                  {genre.map((g) => (
                    <span
                      key={g}
                      className="px-3 py-1 bg-gray-700 hover:bg-gray-600 transition-colors rounded-full text-xs font-medium"
                    >
                      {g}
                    </span>
                  ))}
                </div>

                {/* Rating */}
                <p className="mt-2 text-sm font-semibold">
                  ⭐ {movie.vote_average} / 10 ({movie.vote_count} votes)
                </p>
              </div>
            </div>

            {/* Trailer Section */}
            <div className="w-full rounded-xl overflow-hidden shadow-lg">
              {officialTrailer === null ? (
                <div className="flex items-center justify-center h-[35vh] sm:h-[40vh]">
                  <Spinner />
                </div>
              ) : (
                <TrailerPlayback officialTrailer={officialTrailer} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
