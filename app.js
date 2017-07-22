var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    passport        = require("passport"),
    expressSession  = require("express-session"),
    indexRoutes     = require("./routes/index"),
    movieRoutes     = require("./routes/movies"),
    actorRoutes     = require("./routes/actors"),
    authentication  = require("./authentication"),
    flash           = require("connect-flash"),
    app             = express();

// generic configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded( { extended: true } ));
app.use(methodOverride("_method"));
app.use(flash());
mongoose.connect(process.env.MONGO_MOVIEDB);

// passport and express session configuration
passport.serializeUser(function(user, callback) {
  callback(null, user);
});
passport.deserializeUser(function(obj, callback) {
  callback(null, obj);
});

app.use(expressSession({
  secret: "movieDatabase",
  resave: true,
  saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());

// configure middleware to pass through local data
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

// routes configuration
app.use("/", indexRoutes);
app.use("/movies", movieRoutes);
app.use("/movies/:id/actors", actorRoutes);

// start application
app.listen(process.env.PORT, process.env.IP, function() {
  console.log("movie-db-server startet successfully on port 8080");
});
