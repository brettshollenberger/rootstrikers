module.exports = function(app, db) {
  //Post to add new projects
  app.post('/api/project', function(req, res) {
    var data = req.body;

    //Ask the db to create a new Project
    //passing the data of the request  and a cb
    db.project.create({
      name: data.name,
      description: data.description,
      shortname: data.shortname
    }, function(err, model) {
      if (!err) {
        res.json(model); //If went ok return the json of the model
      } else {
        res.json(err); // If could not be save send the json of the error (A better error strategy can be defined)
      }
    });
  });

  //Get of all project
  app.get('/api/project', function(req, res) {
    var cb = function(err, list) {
      if (!err) {
        res.json(list); //If went ok return the json of the query result
      } else {
        res.json(err);
      }
    };

    if (req.query) {
      db.project.find(req.query, cb);
    } else {
      db.project.findAll(cb);
    }
  });

  //Get of a single project
  app.get('/api/project/:projectID', function(req, res) {
    db.project.find({
        id: req.params.projectID
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

  app.post('/api/project/:projectID', function(req, res) {
    if(req.body.InkBlob && typeof req.body.InkBlob === "object"){
      //Stringify InkBlob so we dont care if the db support JSON
      req.body.InkBlob = JSON.stringify(req.body.InkBlob);
    }
    db.project.update(req.params.projectID, req.body,
      function(err, project) {
        if (!err) {
          res.json(project);
        } else {
          res.send(err);
        }
      });
  });

  app.del('/api/project/:projectID', function(req, res) {
    db.project.remove(req.params.projectID,
      function(err, project) {
        if (!err) {
          res.json(project);
        } else {
          res.send(err);
        }
      });
  });
};