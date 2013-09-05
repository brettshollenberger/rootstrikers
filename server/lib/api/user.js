var _ = require('underscore'),
  verifyUser = function(req, db, mail, user) {
    //After user is create send a verification email using email_verfy template
    db.email.find({
      id: 'email_verify'
    }, function(err, doc) {
      if (err) throw err;

      //Create a verification link 
      var link = {
        verification_link: req.headers.host + '/verify/' + user.id
      };

      var template = doc[0];
      mail.send({
        to: user.email,
        from: template.from,
        subject: template.subject,
        html: _.template(template.body || "", _.extend(user, link)) //Apply user to the template
      }, function(err, json) {
        if (err) throw err;
      });
    });
  },
  cleanUser = function(user) {
    var fields = ['__v', 'password', '_id'],
      clean = function(dirty) {
        return _.omit((dirty.toJSON) ? dirty.toJSON() : dirty, fields);
      };
    //Remove fields dont need it on the client
    if (_.isArray(user)) {
      return _.map(user, function(item) {
        return clean(item);
      });
    }
    return clean(user);
  };

//Handlebars like templates
_.templateSettings = {
  interpolate: /\{\{(.+?)\}\}/g
};

module.exports = function(app, db, mail) {
  //Post to add new users
  app.post('/api/user', function(req, res) {
    var data = req.body,
      createUser = function(db, data, res, cb) {
        //Ask the db to create a new user
        //passing the data of the request  and a cb
        db.user.create({
          first_name: data.first_name,
          last_name: data.last_name,
          password: data.password,
          email: data.email,
          city: data.city,
          state: data.state,
          country: data.country,
          avatar: data.avatar,
          thumb: data.thumb,
          isFacebook: data.isFacebook,
          isVerify: data.isVerify,
          fbID: data.fbID
          //actionkitId: data.actionkitId
        }, function(err, model) {
          if (!err) {
            req.logIn(model, function() {
              res.json(cleanUser(model)); //If went ok return the json of the model
            });
          } else {
            res.json(err); // If could not be save send the json of the error (A better error strategy can be defined)
          }
          if (cb) {
            cb(err, model);
          }
        });
      };

    if (data.fbID) {
      //is a facebook user it can already exist 
      db.user.find({
          fbID: data.fbID
        },
        function(err, list) {
          if (!err) {
            //if already exist loge in and update
            if (list.length) {
              req.logIn(list[0], function() {

              });
              db.user.update(list[0].id.toString(), data, function(err, user) {
                res.json(cleanUser(user));
              });
            } else {
              //if not we create it
              createUser(db, data, res);
            }
          } else {
            res.json(err);
          }
        });
    } else {
      //Create a user with full sign up
      createUser(db, data, res, function(err, user) {
        if (err) throw err;
        verifyUser(req, db, mail, user);
      });
    }
  });

  //Get of all user
  app.get('/api/user', function(req, res) {
    var cb = function(err, list) {
      if (!err) {
        res.json(cleanUser(list)); //If went ok return the json of the query result
      } else {
        res.json(err);
      }
    };

    if (req.query) {
      db.user.find(req.query, cb);
    } else {
      db.user.findAll(cb);
    }
  });

  //Get of a single user
  app.get('/api/user/:userID', function(req, res) {
    db.user.find({
        id: req.params.userID
      },
      function(err, list) {
        if (!err) {
          //If went ok return the json of the query result
          if (list.length) {
            res.json(cleanUser(list[0]));
          } else {
            res.json({
              message: 'Object Not Found'
            });
          }
        } else {
          res.json(err);
        }
      });
  });

  app.post('/api/user/chekUnique', function(req, res) {
    db.user.find(req.body,
      function(err, list) {
        if (!err) {
          if (list.length) {
            res.json({
              unique: false
            });
          } else {
            res.json({
              unique: true
            });
          }
        } else {
          res.json(err);
        }
      });
  });

  app.post('/api/user/:userID', function(req, res) {
    db.user.update(req.params.userID, req.body,
      function(err, user) {
        if (!err) {
          res.json(cleanUser(user));
        } else {
          res.send(err);
        }
      });
  });

  app.del('/api/user/:userID', function(req, res) {
    db.user.remove(req.params.userID,
      function(err, user) {
        if (!err) {
          res.json(cleanUser(user));
        } else {
          res.send(err);
        }
      });
  });

  //request a new verification email
  app.get('/api/user/verify/:userID', function(req, res) {
    db.user.find({
        id: req.params.userID
      },
      function(err, list) {
        if (!err) {
          if (list.length) {
            verifyUser(req, db, mail, list[0]);
          }
        } else {
          res.json(err);
        }
      });
  });

  //Process verification link and update user status to verify
  app.get('/verify/:userID', function(req, res) {
    db.user.update(req.params.userID, {
        isVerify: true
      },
      function(err, user) {
        if (!err) {
          res.redirect('/');
        } else {
          res.redirect('/');
        }
      });
  });
};