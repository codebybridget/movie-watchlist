const router = require("express").Router();
const Movie = require("../models/Movie");

// GET ALL
router.get("/", async (req, res) => {
  const movies = await Movie.find();
  res.json(movies);
});

// ADD MOVIE
router.post("/", async (req, res) => {
  const movie = new Movie(req.body);
  await movie.save();
  res.json(movie);
});

// UPDATE STATUS
router.put("/:id", async (req, res) => {
  const updated = await Movie.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(updated);
});

module.exports = router;