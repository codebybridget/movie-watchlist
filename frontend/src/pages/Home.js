import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import MovieList from "../components/MovieList";
import HeroBanner from "../components/HeroBanner";
import {
  searchMoviesAPI,
  getTrending,
  getTopRated,
  getWatchlist,
  addMovie,
  updateMovieStatus,
} from "../utils/api";

export default function Home() {
  const [searchResults, setSearchResults] = useState([]);
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [watchlist, setWatchlist] = useState([]);

  // 🔥 Load data
  useEffect(() => {
    getTrending().then(setTrending);
    getTopRated().then(setTopRated);
    loadWatchlist();
  }, []);

  const loadWatchlist = async () => {
    try {
      const data = await getWatchlist();
      console.log("FROM DB:", data);
      setWatchlist(data);
    } catch (err) {
      console.error("Error loading watchlist:", err);
    }
  };

  // 🔍 SEARCH
  const searchMovies = async (query) => {
    try {
      const results = await searchMoviesAPI(query);
      setSearchResults(results);
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  // ➕ ADD MOVIE
  const addToWatchlist = async (movie) => {
    try {
      const newMovie = {
        title: movie.title,
        release_date: movie.release_date,
        poster: movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : "",
        status: "watching",
      };

      await addMovie(newMovie);
      loadWatchlist(); // refresh
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // 🔄 CHANGE STATUS (ONLY ONE VERSION — FIXED)
  const changeStatus = async (id) => {
    try {
      const movie = watchlist.find((m) => m._id === id);

      let newStatus;

      if (movie.status === "watching") {
        newStatus = "watched";
      } else if (movie.status === "watched") {
        newStatus = "will-watch"; // 👉 My List
      } else {
        newStatus = "watching";
      }

      await updateMovieStatus(id, newStatus);

      loadWatchlist(); // refresh
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="bg-black min-h-screen text-white">

      {/* Navbar */}
      <div className="p-4 text-2xl font-bold text-red-600">
        LADYB NETFLIX
      </div>

      {/* Hero */}
      <HeroBanner movies={trending} />

      {/* Search */}
      <SearchBar onSearch={searchMovies} />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <>
          <h2 className="px-4 text-xl mt-4">Search Results</h2>
          <MovieList movies={searchResults} onAdd={addToWatchlist} />
        </>
      )}

      {/* Trending */}
      <h2 className="px-4 text-xl mt-6">Trending</h2>
      <MovieList movies={trending} onAdd={addToWatchlist} />

      {/* Top Rated */}
      <h2 className="px-4 text-xl mt-6">Top Rated</h2>
      <MovieList movies={topRated} onAdd={addToWatchlist} />

      {/* Continue Watching */}
      <h2 className="px-4 text-xl mt-6">Continue Watching</h2>
      <MovieList
        movies={watchlist.filter((m) => m.status === "watching")}
        changeStatus={changeStatus}
      />

      {/* My List */}
      <h2 className="px-4 text-xl mt-6">My List</h2>
      <MovieList
        movies={watchlist.filter((m) => m.status === "will-watch")}
        changeStatus={changeStatus}
      />

      {/* Watched */}
      <h2 className="px-4 text-xl mt-6">Watched</h2>
      <MovieList
        movies={watchlist.filter((m) => m.status === "watched")}
        changeStatus={changeStatus}
      />
    </div>
  );
}