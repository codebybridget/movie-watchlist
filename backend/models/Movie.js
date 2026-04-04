const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  userId: String,
  title: String,
  poster: String,
  release_date: String,
  status: String,
});

module.exports = mongoose.model("Movie", movieSchema);