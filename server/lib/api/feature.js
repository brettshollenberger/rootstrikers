module.exports = function(app, db) {

  //*****************************// Index //**********************************//
  app.get('/api/features', function(req, res) {
    var cb = function(error, features) {
      if (!error) {
        res.json(features); // Write the jsonified features to the response object
      } else {
        res.json(error);
      }
    };
    features = db.feature.findAll(cb);
  });

  //***************************// Published //*********************************//
  app.get('/api/features/published', function(req, res) {
    var cb = function(error, features) {
      if (!error) {
        res.json(features); // Write the jsonified features to the response object
      } else {
        res.json(error);
      }
    };
    features = db.feature.find({published: true}, cb);
  });

  //******************************// Show //**********************************//
  app.get('/api/features/:id', function(req, res) {
    db.feature.find({
        id: req.params.id
      },
      function(error, feature) {
        if (!error) {
          if (feature.length) {
            res.json(feature[0]);
          } else {
            res.json({
              message: 'Object Not Found'
            });
          }
        } else {
          res.json(error);
        }
      });
  });

  //*****************************// Create //*********************************//
  app.post('/api/features', function(req, res) {
    var data = req.body;

    db.feature.create({
      message: data.message,
      action: data.action,
      actionUrl: data.actionUrl,
      image: data.image, //we save the InkBLob of the image to delete it when the project is deleted
      InkBlob: (data.InkBlob && typeof data.InkBlob === "object")?  JSON.stringify(data.InkBlob) : data.InkBlob,
      published: data.published
    }, function(error, feature) {
      if (!error) {
        res.json(feature);
      } else {
        res.json(error);
      }
    });
  });

  //*****************************// Update //*********************************//
  app.put('/api/features/:id', function(req, res) {
    var data = req.body;
    db.feature.update(req.params.id, req.body, function(error, feature) {
      if (error) {
        return res.send(error);
      } else {
        res.json(feature);
      }
    });
  });

  //*****************************// Destroy //********************************//
  app.del('/api/features/:id', function (req, res){
    return db.feature.remove(req.params.id, function (error) {
        if (!error) {
          res.send('');
        } else {
          res.send(error);
        }
      });
    });

};
