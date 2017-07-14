var express             = require("express"),
    router              = express.Router(),
    Movie               = require("../models/movie"),
    ensureAuthenticated = require("./ensureAuthenticated");

// INDEX route
router.get("/", function(req, res) {
  Movie.find({}, function(err, movies) {
    if(err) {
      console.log(err);
    } else {
      res.render("movies/index", { movies: movies });
    }
  });
});

// NEW route
router.get("/new", ensureAuthenticated, function(req, res) {
  res.render("movies/new");
});

// CREATE route
router.post("/", ensureAuthenticated, function(req, res) {
  Movie.create(req.body.movie, function(err, movie) {
    if(err) {
      console.log(err);
    } else {
      var user = req.user;
      movie.createdBy.id = user._id;
      movie.createdBy.username = user.name;
      movie.save();
    }
    res.redirect("/movies");
  });
});

// SHOW route
router.get("/:id", function(req, res) {
  Movie.findById(req.params.id).populate("actors").exec(function(err, movie) {
    if(err) {
      console.log(err);
      res.redirect("/movies");
    } else {
      res.render("movies/show", { movie : movie });
    }
  });
});

// EDIT route
router.get("/:id/edit", ensureAuthenticated, function(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    if(err) {
      console.log(err);
      res.redirect("/movies");
    } else {
      res.render("movies/edit", { movie : movie });
    }
  });
});

// UPDATE route
router.put("/:id", ensureAuthenticated, function(req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, movie) {
    if(err) {
      console.log(err);
    }
    res.redirect("/movies/".concat(req.params.id));
  });
});

// DELETE route
router.delete("/:id", ensureAuthenticated, function(req, res) {
  Movie.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      console.log(err);
    }
    res.redirect("/movies");
  });
});

module.exports = router;
