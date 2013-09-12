module.exports = function(app, db, auth) {
  db.email.count({}, function(err, count) {
    if (err) throw err;
    if (count === 0) {
      db.email.create({
        id: 'email_verify',
        name: 'Email Verification',
        description: 'Email Sent when a new user is register by email to confirm account',
        subject: 'Welcome to Rootstrike',
        from: 'no-replay@rootstrike.com',
        vars: 'From User: verification_link, ' + (['id', 'first_name', 'last_name', 'email', 'city', 'state', 'country', 'avatar', 'thumb'].join(', '))
      });
    }
  });

  //Get of all email
  app.get('/api/email', auth.middleware(true), function(req, res) {
    var cb = function(err, list) {
      if (!err) {
        res.json(list); //If went ok return the json of the query result
      } else {
        res.json(err);
      }
    };

    if (req.query) {
      db.email.find(req.query, cb);
    } else {
      db.email.findAll(cb);
    }
  });

  //Get of a single email
  app.get('/api/email/:emailID', auth.middleware(true), function(req, res) {
    db.email.find({
        id: req.params.emailID
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

  app.post('/api/email/:emailID', auth.middleware(true), function(req, res) {
    db.email.update(req.params.emailID, req.body,
      function(err, email) {
        if (!err) {
          res.json(email);
        } else {
          res.send(err);
        }
      }, true);
  });
};