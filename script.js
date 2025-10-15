const API_BASE = "https://imdb.iamidiotareyoutoo.com/search?q=";

// DOM ELEMENTS 
const searchInput = document.getElementById("searchInput");
const searchBtn = document.getElementById("searchBtn");
const resultsEl = document.getElementById("results");

const lists = {
  "will-watch": document.getElementById("willWatch"),
  "watching": document.getElementById("watching"),
  "watched": document.getElementById("watched"),
};

let watchlist = JSON.parse(localStorage.getItem("watchlist")) || [];

// SEARCH MOVIES 
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.trim();
  if (!query) return alert("Please enter a movie name.");
  searchMovies(query);
});

async function searchMovies(query) {
  resultsEl.innerHTML = "Searching...";
  try {
    const response = await fetch(API_BASE + encodeURIComponent(query));
    const data = await response.json();
    const movies = data.description || [];

    if (!movies.length) {
      resultsEl.innerHTML = "No results found.";
      return;
    }

    renderSearchResults(movies);
  } catch (error) {
    resultsEl.innerHTML = "Error fetching movies.";
  }
}

function renderSearchResults(movies) {
  resultsEl.innerHTML = movies
    .map(
      (m) => `
    <div class="movie-card">
      <img src="${
        m["#IMG_POSTER"] || "https://via.placeholder.com/200x300?text=No+Image"
      }" alt="${m["#TITLE"]}">
      <h4>${m["#TITLE"]}</h4>
      <p>${m["#YEAR"]}</p>
      <button onclick="addToWatchlist('${m["#IMDB_ID"]}', '${m[
        "#TITLE"
      ].replace(/'/g, "\\'")}', '${m["#YEAR"]}', '${m["#IMG_POSTER"]}', '${
        m["#IMDB_URL"]
      }')">Add</button>
      <button onclick="window.open('${m["#IMDB_URL"]}', '_blank')">Stream Now</button>
      <button onclick="window.open('https://www.youtube.com/results?search_query=${encodeURIComponent(
        m["#TITLE"] + " trailer"
      )}', '_blank')">Watch Trailer</button>
    </div>
  `
    )
    .join("");
}

// WATCHLIST MANAGEMENT
function addToWatchlist(id, title, year, poster, imdb) {
  if (watchlist.find((m) => m.id === id)) {
    alert("This movie is already in your watchlist!");
    return;
  }

  watchlist.push({ id, title, year, poster, imdb, status: "will-watch" });
  saveAndRender();
}

function removeMovie(id) {
  watchlist = watchlist.filter((m) => m.id !== id);
  saveAndRender();
}

function changeStatus(id) {
  const movie = watchlist.find((m) => m.id === id);
  if (!movie) return;

  const nextState = {
    "will-watch": "watching",
    watching: "watched",
    watched: "will-watch",
  };

  movie.status = nextState[movie.status];
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("watchlist", JSON.stringify(watchlist));
  renderWatchlist();
}

function renderWatchlist() {
  Object.keys(lists).forEach((key) => (lists[key].innerHTML = ""));

  watchlist.forEach((m) => {
    lists[m.status].innerHTML += `
      <div class="movie-card" draggable="true" ondragstart="drag(event)" data-id="${m.id}">
        <img src="${
          m.poster || "https://via.placeholder.com/200x300?text=No+Image"
        }" alt="${m.title}" />
        <h4>${m.title}</h4>
        <p>${m.year}</p>
        <button onclick="changeStatus('${m.id}')">${m.status}</button>
        <button onclick="removeMovie('${m.id}')">Remove</button>
      </div>
    `;
  });
}

// DRAG & DROP 
let draggedId = null;

function drag(e) {
  draggedId = e.target.dataset.id;
}

document.querySelectorAll(".list").forEach((list) => {
  list.addEventListener("dragover", (e) => e.preventDefault());
  list.addEventListener("drop", (e) => {
    e.preventDefault();
    const id = draggedId;
    const newStatus = list.dataset.status;
    const movie = watchlist.find((m) => m.id === id);

    if (movie) {
      movie.status = newStatus;
      saveAndRender();
    }
  });
});

// SHARE FEATURE 
document.getElementById("shareBtn").addEventListener("click", async () => {
  const listText = watchlist
    .map((m) => `${m.title} (${m.status})`)
    .join("\n");

  if (navigator.share) {
    await navigator.share({
      title: "My Movie Watchlist",
      text: listText,
    });
  } else {
    navigator.clipboard.writeText(listText);
    alert("Your watchlist has been copied to the clipboard!");
  }
});

// INITIAL RENDER 
renderWatchlist();
