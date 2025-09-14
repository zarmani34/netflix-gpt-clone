// browseLoader.js
import axios from "axios";
import { apiKeys, options, trailerApiUrl } from "./urls";

// Create separate caches for movies and trailers
const movieCache = new Map();
const trailerCache = new Map();

export const browseLoader = async ({ params }) => {
  const fetchApiUrl = (endPoint) => {
    return `https://api.themoviedb.org/3${endPoint}?api_key=${apiKeys}&language=en-US&page=1`;
  };

  const { browsePage } = params; // Extract route parameter

  // Map label to TMDB API endpoints
  const endpointMap = {
    "Trending Movies": "/trending/all/day",
    "Popular Movies": "/movie/popular",
    "Top Rated Movies": "/movie/top_rated",
    "Popular TV Shows": "/tv/popular",
    "Discover More": "/discover/movie",
  };
  
  const endpoint = endpointMap[browsePage] || endpointMap["Trending Movies"];

  const apiUrl = fetchApiUrl(endpoint);

  try {
    // Check if we have cached movie data
    let movieData = movieCache.get(apiUrl);

    // Fetch data using Axios
   if (!movieData) {
      // Fetch and cache movie data if not found
      const response = await axios({
        url: apiUrl,
        method: options.method,
        headers: options.headers,
      });
      movieData = response.data;
      movieCache.set(apiUrl, movieData);
    }
    
    const trailerId = movieData.results[0]?.id;
    if (!trailerId) {
      return { data: movieData, officialTrailer: null };
    }

    // Check if we have cached trailer data
    let trailerKey = trailerCache.get(trailerId);
    
    if (trailerKey === undefined) {  // Use undefined check to allow null values in cache
      const trailerUrl = trailerApiUrl(trailerId, apiKeys);
      try {
        const trailerData = await axios({
          url: trailerUrl,
          method: options.method,
          headers: options.headers,
        });
        
        const trailer = trailerData.data.results;
        const officialTrailer = trailer.find(
          video => video.type === "Trailer" && video.site === "YouTube"
        );
        
        trailerKey = officialTrailer?.key || null;
        trailerCache.set(trailerId, trailerKey);
      } catch (trailerError) {
        if (trailerError.response?.status === 404) {
          trailerKey = null;
          trailerCache.set(trailerId, null);
        } else {
          console.error("Error fetching trailer:", trailerError);
          trailerKey = null;
        }
      }
    }

    return { 
      data: movieData, 
      officialTrailer: trailerKey 
    };
    // throw new Error("No movie found.");
  } catch (error) {
    console.error("Error in browseLoader:", error);
    throw new Response("Failed to fetch movies", {
      status: error.response?.status || 500,
      statusText: error.message,
    });
  }
  
};