export const vidUrl =
  "https://occ-0-4616-32.1.nflxso.net/so/soa4/155/1848846380518042113.mp4?v=1&e=1732240817&t=d3GAwaAD0JzBPdBJvDOFFPVhgYg";

export const netflixLogo =
  "https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png";

export const bgUrl =
  "https://assets.nflxext.com/ffe/siteui/vlv3/4690cab8-243a-4552-baef-1fb415632f74/web/NG-en-20241118-TRIFECTA-perspective_41d3d613-b450-45e3-8ab3-ba814d988ae5_large.jpg";

export const apiKeys = process.env.REACT_APP_TMDB_API_KEY;
export const AI_KEY = process.env.REACT_APP_GOOGLE_API_KEY;

export const trailerApiUrl = (trailerId, apiKeys) =>
  `https://api.themoviedb.org/3/movie/${trailerId}/videos?api_key=${apiKeys}&language=en-US`;

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMDJlNDU0NTFkNjllYzg4MjliOWVmMTkzNDI5YzZhOSIsIm5iZiI6MTczMjc4NjAyOC4zODYyNjgsInN1YiI6IjY3NDgzMWE0MmE0MmA1NjIyYjEwNTcxNzhjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YQYfrD3oIy_4BeJJx4hFFB7dLfwedMgwo_jzr0XqqxA",
  },
};

export const posterPathUrl = (poster_path) =>
  `https://image.tmdb.org/t/p/w200${poster_path}`;

export const genreApiUrl = (apiKeys) =>
  `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKeys}&language=en-US`;

// 

export const gptQuery = (
  userQuery
) =>`Act as a movie search engine that returns a list of movie\movies that match the user\'s search query.
You are to return a movie list based on the user query which should not be more than 5 movies and they should be comma seperated,
for example movie1, movie2, movie3, movie5. Also if the user query is a movie tittle return just one movie tittle and if the movie is not available,
you are to return the user query as it is. This is the user query: ${userQuery}. No need for any explanation, just the movie tittle or
list of movie suggestions as your response will be handled by code`;

// `Act as a movie search engine that returns a list of movie\movies that match the user\'s search query.
// You are to return a movie list based on the user query which should not be more than 5 movies and they should be comma seperated,
// for example movie1, movie2, movie3, movie5. Also if the user query is a movie tittle return just one movie tittle and if the movie is not available,
// you are to return the user query as it is. This is the user query ${userQuery}. No need for any explanation, just the movie tittle or
// list fo movie suggestions as your response will be handled by code`;
// This is the user query: ${userQuery}. `
