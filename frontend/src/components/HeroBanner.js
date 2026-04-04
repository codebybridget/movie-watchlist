import { useEffect, useState } from "react";

export default function HeroBanner({ movies }) {
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    if (movies.length > 0) {
      setMovie(movies[Math.floor(Math.random() * movies.length)]);
    }
  }, [movies]);

  if (!movie) return null;

  return (
    <div
      className="h-[70vh] bg-cover bg-center flex items-end p-8"
      style={{
        backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
      }}
    >
      <div className="bg-gradient-to-t from-black via-black/70 to-transparent p-4">
        <h1 className="text-4xl font-bold">{movie.title}</h1>
        <p className="max-w-md text-gray-300 mt-2">
          {movie.overview?.slice(0, 150)}...
        </p>
      </div>
    </div>
  );
}