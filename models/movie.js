var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  summary: String,
  director: String,
  year: String
});

module.exports = mongoose.model("Movie", movieSchema);
