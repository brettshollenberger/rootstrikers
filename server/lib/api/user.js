module.exports = function(app, db) {
  //Post to add new users
  app.post('/api/user', function(req, res) {
    var data = req.body;

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
      avatar: data.avatar
    }, function(err, model) {
      if (!err) {
        res.json(model); //If went ok return the json of the model
      } else {
        res.json(err); // If could not be save send the json of the error (A better error strategy can be defined)
      }
    });
  });

  //Get of all user
  app.get('/api/user', function(req, res) {
    var cb = function(err, list) {
      if (!err) {
        res.json(list); //If went ok return the json of the query result
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
            res.json(list[0]);
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

  app.post('/api/user/:userID', function(req, res) {
    db.user.update(req.params.userID, req.body,
      function(err, user) {
        if (!err) {
          res.json(user);
        } else {
          res.send(err);
        }
      });
  });

  app.del('/api/user/:userID', function(req, res) {
    db.user.remove(req.params.userID,
      function(err, user) {
        if (!err) {
          res.json(user);
        } else {
          res.send(err);
        }
      });
  });
};