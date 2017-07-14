var mongoose  = require("mongoose");

var userSchema = new mongoose.Schema({
  facebookId: String,
  name: String,
  created: Date
});

var User = mongoose.model("User", userSchema);

module.exports = User;
