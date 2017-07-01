var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser     = require("body-parser"),
    methodOverride = require("method-override"),
    app             = express();

// generic configuration
app.set("view-engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(methodOverride("_method"));
mongoose.connect("mongodb://localhost/movie_db");

// INDEX route
app.get("/", function(req, res) {
  res.send("INDEX");
});

// start application
app.listen("8080", "127.0.0.1", function() {
  console.log("movie-db-server startet successfully on port 8080");
});
