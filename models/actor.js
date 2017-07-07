var mongoose = require("mongoose");

var actorSchema = new mongoose.Schema( {
  firstName: String,
  lastName: String,
  image: String
});

module.exports = mongoose.model("Actor", actorSchema);
