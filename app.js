var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    indexRoutes     = require("./routes/index"),
    movieRoutes     = require("./routes/movies"),
    actorRoutes     = require("./routes/actors"),
    app             = express();

// generic configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/movie_db");

// routes configuration
app.use("/", indexRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/actors", actorRoutes);

// start application
app.listen("8080", "127.0.0.1", function() {
  console.log("movie-db-server startet successfully on port 8080");
});
