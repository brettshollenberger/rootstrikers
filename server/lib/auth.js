module.exports = function(app, db) {
  var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    auth = function(req, res, next) {
      if (!req.isAuthinticated()) {
        res.send(401);
      } else {
        next();
      }
    };

  //PassportJS strategy
  passport.use(new LocalStrategy(
    function(username, password, done) {
      //test
      if (username === "admin" && password === "admin"){
        return done(null, {
          name: "admin"
        });
      }

      return done(null, false, {
        message: 'Incorrect username.'
      });
    }
  ));

  // Serialized and deserialized methods when got from session
  passport.serializeUser(function(user, done) {
    done(null, user);
  });

  passport.deserializeUser(function(user, done) {
    done(null, user);
  });

  app.post('/auth/login', passport.authenticate('local'), function(req, res) {
    res.send(req.user);
  });

  app.post('/auth/logout', function(req, res) {
    req.logOut();
    res.send(200);
  });
};