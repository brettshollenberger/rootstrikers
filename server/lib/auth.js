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

  app.use(passport.initialize());
  app.use(passport.session());

  //PassportJS strategy
  passport.use(new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      db.user.find({
          email: email
        },
        function(err, doc) {
          //If we found the user lets compare password
          if (doc.length) {
            user = doc[0];
            //If its from facebook dont need to compare passwords
            if (user.isFacebook) {
              done(null, user);
              return;
            }
            user.comparePassword(password, function(err, isMatch) {
              if (err) {
                //If an error on the compare return false and message
                done(null, false, {
                  message: 'Error on Validation'
                });
              } else {
                if (isMatch) {
                  //If password match return user
                  done(null, user);
                } else {
                  //Password dont match return false and message
                  done(null, false, {
                    message: 'Invalid Password'
                  });
                }
              }
            });
          } else {
            //If we dont found the user return false
            done(null, false, {
              message: 'User dont exist'
            });
          }
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
    return res.send(user);
  });

  app.get('/auth/logout', function(req, res) {
    req.logOut();
    res.send(200);
  });
};