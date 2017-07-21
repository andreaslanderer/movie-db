var Movie = require("../models/movie");

var middleware = {};

// check if user is logged in
middleware.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  res.redirect("back");
}

middleware.isOwnerOfMovie = function(req, res, next) {
  if(req.isAuthenticated()) {
    Movie.findById(req.params.id, function(err, movie) {
      if(err) {
        console.log(err);
        res.redirect("back");
      } else if (!movie.createdBy.userId.equals(req.user._id)) {
        console.log("Only the creator of a movie is permitted to update it!");
      } else {
        next();
      }
    });
  } else {
    console.log("You have to be logged in, in order to update a movie!");
    res.redirect("back");
  }
}

module.exports = middleware;
