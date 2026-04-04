import MovieCard from "./MovieCard";

export default function MovieList({ movies, onAdd, changeStatus }) {
  return (
    <div className="flex overflow-x-scroll gap-4 p-4">
      {movies.map((m) => (
        <MovieCard
          key={m._id || m.id}   // ✅ FIX HERE
          movie={m}
          onAdd={onAdd}
          changeStatus={changeStatus}
        />
      ))}
    </div>
  );
}