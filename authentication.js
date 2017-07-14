
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var User = require('./models/user.js');
var oauth = require('./oauth.js');

module.exports = passport.use(new Strategy({
  clientID: oauth.facebook.clientID,
  clientSecret: oauth.facebook.clientSecret,
  callbackURL: oauth.facebook.callbackURL
}, function(accessToken, refreshToken, profile, callback) {
  User.findOne({ facebookId: profile.id }, function(err, user) {
    if(err) {
      console.log(err);
      res.redirect("/movies");
    } else if(user != null) {
      callback(null, user);
    } else {
      var user = {
        facebookId: profile.id,
        name: profile.displayName,
        created: Date.now()
      };
      User.create(user, function(err, user) {
        if(err) {
          console.log(err);
          res.redirect("/movies");
        } else {
          callback(null, user);
        }
      });
    }
  });
}));
