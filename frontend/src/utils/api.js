const BASE_URL = "https://movie-watchlist-kmhz.onrender.com/api/movies";

// GET
export const getWatchlist = async () => {
  const res = await fetch(BASE_URL);
  return res.json();
};

// ADD
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

// UPDATE
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