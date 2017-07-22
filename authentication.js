
var passport = require('passport');
var Strategy = require('passport-facebook').Strategy;
var User = require('./models/user.js');

module.exports = passport.use(new Strategy({
  clientID: process.env.OAUTH_FB_CLIENTID,
  clientSecret: process.env.OAUTH_FB_CLIENTSECRET,
  callbackURL: process.env.OAUTH_FB_CALLBACKURL
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
