import { useState } from "react";

export default function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <div className="p-4 flex gap-2">
      <input
        className="p-2 w-full rounded bg-gray-800 text-white"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      <button
        className="bg-red-600 px-4 rounded"
        onClick={handleSearch}
      >
        Search
      </button>
    </div>
  );
}