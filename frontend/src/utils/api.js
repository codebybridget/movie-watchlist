const TMDB_KEY = process.env.REACT_APP_TMDB_KEY;

// 🔍 SEARCH MOVIES
export const searchMoviesAPI = async (query) => {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_KEY}&query=${query}`
  );
  const data = await res.json();
  return data.results || [];
};

// 🔥 TRENDING
export const getTrending = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/trending/movie/week?api_key=${TMDB_KEY}`
  );
  const data = await res.json();
  return data.results || [];
};

// ⭐ TOP RATED
export const getTopRated = async () => {
  const res = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${TMDB_KEY}`
  );
  const data = await res.json();
  return data.results || [];
};

// ===============================
// 🔗 BACKEND (VERY IMPORTANT)
// ===============================

const BASE_URL = "http://localhost:5000/api/movies";

// 📥 GET WATCHLIST
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