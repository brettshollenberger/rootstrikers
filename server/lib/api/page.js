module.exports = function(app, db) {
  app.post('/api/page', function(req, res) {
    var data = req.body;

    db.page.create({
      name: data.name,
      url: data.url || data.name.replace(/\s/g,'_').toLowerCase(),
      header: data.header,
      body: data.body
    }, function(err, model) {
      if (!err) {
        res.json(model); //If went ok return the json of the model
      } else {
        res.json(err); // If could not be save send the json of the error (A better error strategy can be defined)
      }
    });
  });

  //Get of all page
  app.get('/api/page', function(req, res) {
    var cb = function(err, list) {
      if (!err) {
        res.json(list); //If went ok return the json of the query result
      } else {
        res.json(err);
      }
    };

    if (req.query) {
      db.page.find(req.query, cb);
    } else {
      db.page.findAll(cb);
    }
  });

  //Get of a single page
  app.get('/api/page/:pageID', function(req, res) {
    db.page.find({
        id: req.params.pageID
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

  app.post('/api/page/:pageID', function(req, res) {
    db.page.update(req.params.pageID, req.body,
      function(err, page) {
        if (!err) {
          res.json(page);
        } else {
          res.send(err);
        }
      });
  });

  app.del('/api/page/:pageID', function(req, res) {
    db.page.remove(req.params.pageID,
      function(err, page) {
        if (!err) {
          res.json(page);
        } else {
          res.send(err);
        }
      });
  });
};