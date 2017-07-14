var express   = require("express"),
    passport  = require("passport"),
    User      = require("../models/user"),
    router    = express.Router();

router.get("/", function(req, res) {
  res.redirect("/movies");
});

router.get("/register", passport.authenticate("facebook"), function(req, res) {
  res.redirect("/movies");
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/movies");
});

module.exports = router;
