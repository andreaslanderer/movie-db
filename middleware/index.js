var Movie = require("../models/movie");

var middleware = {};

// check if user is logged in
middleware.isLoggedIn = function(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  }
  req.flash("error", "You have to be logged in, in order to use the functionality!");
  res.redirect("/movies");
}

middleware.isOwnerOfMovie = function(req, res, next) {
  if(req.isAuthenticated()) {
    Movie.findById(req.params.id, function(err, movie) {
      if(err) {
        console.log(err);
        req.flash("error", "Could not find movie with id " + req.params.id + "!");
        res.redirect("/movies");
      } else if (!movie.createdBy.userId.equals(req.user._id)) {
        req.flash("error", "Only the creator of a movie is permitted to update it!");
        res.redirect("/movies");
      } else {
        next();
      }
    });
  } else {
    console.log("You have to be logged in, in order to update a movie!");
    req.flash("error", "You have to be logged in, in order to update a movie!");
    res.redirect("/movies");
  }
}

module.exports = middleware;
