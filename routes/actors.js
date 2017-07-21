var express     = require("express"),
    router      = express.Router({ mergeParams : true }),
    Movie       = require("../models/movie"),
    middleware  = require("../middleware");
    Actor       = require("../models/actor");

 router.get("/new", middleware.isOwnerOfMovie, function(req, res) {
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

 router.post("/", middleware.isOwnerOfMovie, function(req, res) {
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
           req.flash("success", "New actor/actress has been successfully added!");
         }
         res.redirect("/movies/".concat(req.params.id));
       });
     }
   });
 });

module.exports = router;
