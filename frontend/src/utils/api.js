const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

// 🎬 TMDB BASE
const TMDB_BASE = "https://api.themoviedb.org/3";

// 🔥 TRENDING
export const getTrending = async () => {
  const res = await fetch(
    `${TMDB_BASE}/trending/movie/week?api_key=${TMDB_KEY}`
  );
  const data = await res.json();
  return data.results || [];
};

// ⭐ TOP RATED
export const getTopRated = async () => {
  const res = await fetch(
    `${TMDB_BASE}/movie/top_rated?api_key=${TMDB_KEY}`
  );
  const data = await res.json();
  return data.results || [];
};

//  SEARCH
export const searchMoviesAPI = async (query) => {
  const res = await fetch(
    `${TMDB_BASE}/search/movie?api_key=${TMDB_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results || [];
};

// ==============================
//  BACKEND API (YOUR SERVER)
// ==============================

const BASE_URL =
  "https://movie-watchlist-kmhz.onrender.com/api/movies";

//  GET WATCHLIST
export const getWatchlist = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// ➕ ADD MOVIE
export const addMovie = async (movie) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(movie),
  });
  return res.json();
};

// 🔄 UPDATE STATUS
export const updateMovieStatus = async (id, status) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
  return res.json();
};