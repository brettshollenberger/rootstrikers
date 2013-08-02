module.exports = function(app, db) {
  //Post to add new projects
  app.post('/api/project', function(req, res) {
    var data = req.body;

    //Ask the db to create a new Project
    //passing the data of the request  and a cb
    db.Project.create({
      name: data.name,
      description: data.description
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
    db.Project.findAll(function(err, list) {
      if (!err) {
        res.json(list); //If went ok return the json of the query result
      } else {
        res.json(err);
      }
    });
  });
};