var mongoose = require("mongoose");

var movieSchema = new mongoose.Schema({
  title: String,
  image: String,
  summary: String,
  director: String,
  year: String,
  actors: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Actor"
    }
  ]
});

module.exports = mongoose.model("Movie", movieSchema);
