var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    Movie           = require("./models/movie"),
    Actor           = require("./models/actor"),
    app             = express();

// generic configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/movie_db");

app.get("/", function(req, res) {
  res.redirect("/movies");
});

/*
 * MOVIES
 */

// INDEX route
app.get("/movies", function(req, res) {
  Movie.find({}, function(err, movies) {
    if(err) {
      console.log(err);
    } else {
      res.render("movies/index", { movies: movies });
    }
  });
});

// NEW route
app.get("/movies/new", function(req, res) {
  res.render("movies/new");
});

// CREATE route
app.post("/movies", function(req, res) {
  Movie.create(req.body.movie, function(err, movie) {
    if(err) {
      console.log(err);
    }
    res.redirect("/movies");
  });
});

// SHOW route
app.get("/movies/:id", function(req, res) {
  Movie.findById(req.params.id, function(err, movie) {
    if(err) {
      console.log(err);
      res.redirect("/movies");
    } else {
      res.render("movies/show", { movie : movie });
    }
  });
});

// EDIT route
app.get("/movies/:id/edit", function(req, res) {
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
app.put("/movies/:id", function(req, res) {
  Movie.findByIdAndUpdate(req.params.id, req.body.movie, function(err, movie) {
    if(err) {
      console.log(err);
    }
    res.redirect("/movies/".concat(req.params.id));
  });
});

// DELETE route
app.delete("/movies/:id", function(req, res) {
  Movie.findByIdAndRemove(req.params.id, function(err) {
    if(err) {
      console.log(err);
    }
    res.redirect("/movies");
  });
});

/*
 * ACTORS
 */
 app.get("/movies/:id/actors/new", function(req, res) {
   var id = req.params.id;
   Movie.findById(id).populate("actors").exec(function(err, movie) {
     if(err) {
       console.log(err);
       res.redirect("/");
     } else {
       res.render("actors/new", { movie: movie });
     }
   });
 });

 app.post("/movies/:id/actors", function(req, res) {
   Movie.findById(req.params.id, function(err, movie) {
     if(err) {
       console.log(err);
       res.redirect("/");
     } else {
       Actor.create(req.body.actor, function(err, actor) {
         if(err) {
           console.log(err);
         } else {
           movie.actors.push(actor);
           movie.save();
         }
         res.redirect("/movies/".concat(req.params.id));
       });
     }
   });
 });

// start application
app.listen("8080", "127.0.0.1", function() {
  console.log("movie-db-server startet successfully on port 8080");
});
