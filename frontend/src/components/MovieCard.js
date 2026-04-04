export default function MovieCard({ movie, onAdd, changeStatus }) {
  return (
    <div className="bg-gray-900 p-2 rounded hover:scale-110 transition min-w-[160px] shadow-lg">

      <div className="relative group">
        <img
          src={
            movie.poster_path
              ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
              : movie.poster || "https://via.placeholder.com/200x300"
          }
          alt={movie.title}
          className="rounded w-full h-[220px] object-cover"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center gap-2 transition">

          {/* ADD BUTTON (for TMDB movies) */}
          {onAdd && (
            <button
              className="bg-red-600 px-3 py-1 rounded"
              onClick={() => onAdd(movie)}
            >
              Add
            </button>
          )}

          {/* CHANGE STATUS BUTTON (for watchlist movies) */}
          {changeStatus && (
            <button
              className="bg-gray-700 px-3 py-1 rounded"
              onClick={() => changeStatus(movie._id)} // ✅ FIXED (_id not id)
            >
              {movie.status === "watching" && "Mark as Watched"}
              {movie.status === "watched" && "Move to My List"}
              {movie.status === "will-watch" && "Start Watching"}
            </button>
          )}
        </div>
      </div>

      <h4 className="text-white text-sm mt-2">
        {movie.title}
      </h4>

      <p className="text-gray-400 text-xs">
        {movie.release_date?.split("-")[0]}
      </p>
    </div>
  );
}