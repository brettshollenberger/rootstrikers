var mongoose = require('mongoose')
  , Project = mongoose.model('project')
  ;

module.exports = function(app, db, auth) {
  
  /**
   * Find / query function, allows us to pass a mongodb style query over rest
   *
   * @todo change to GET!!! might require querystring module and will def require modifying angular service
   * @todo add to remaining controllers, currently only in application controller.
   *
   * @example { 'status' : 'open' } // gets all with status open
   * @example { 'status' : { '$nin' : ['open', 'archived', 'denied'] } } // gets all where status not in array
   *
   * @note these must be passed through JSON.stringify on the angular app side
   *
   */
  app.get('/api/project/find', function(req, res, next) {

      // currently query is just request body
      var query = {};

      if(req.query.query) {
        query = JSON.parse(req.query.query);
      }

  /*
      if (req.userHasRole('salesRep')) {
          query.salesRep = req.user._id;
      } else if (req.userHasRole('vendorRep')) {
          query.vendorRep = req.user._id;
      }
  */

      Project
          .find(query)
          .exec(function(err, results) {
              if (err) {
                  res.json(err);
              } else {
                  res.json(results);
              }
          });
  });

  ////////////////////////////////////////////////////
  // Get active projects
  ////////////////////////////////////////////////////
  // Only returns active projects that are published!
  ////////////////////////////////////////////////////
  app.get('/api/project/active', function(req, res) {
    db.project.find({
      $and: [
        { publish: true },
        { $or: [{end_date: undefined}, {end_date: {"$gte" : new Date()}}] }
      ]
    }, function(err, list) {
      if (!err) { 
        res.json(list);
      } else {
        res.json(err);
      }
    });
  });

  ////////////////////////////////////////////////////
  // Get completed projects
  ////////////////////////////////////////////////////
  // Only returns completed projects that are published!
  ////////////////////////////////////////////////////
  app.get('/api/project/completed', function(req, res) {
    db.project.find({
      publish: true,
      end_date: {"$lt": new Date()}
    }, function(err, list) {
      if (!err) { 
        res.json(list);
      } else {
        res.json(err);
      }
    });
  });
  
  //Post to add new projects, auth only for admin
  app.post('/api/project', auth.middleware(true), function(req, res) {
    var data = req.body;

    //Ask the db to create a new Project
    //passing the data of the request  and a cb
    db.project.create({
      title: data.title,
      problem: data.problem,
      action: data.action,
      goal: data.goal,
      shortname: data.shortname,
      end_date: data.end_date,
      image: data.image, //we save the InkBLob of the image to delete it when the project is deleted
      InkBlob: (data.InkBlob && typeof data.InkBlob === "object")?  JSON.stringify(data.InkBlob) : data.InkBlob
    }, function(err, model) {
      if (!err) {
        res.json(model); //If went ok return the json of the model
      } else {
        res.json(err); // If could not be save send the json of the error (A better error strategy can be defined)
      }
    });
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

  //Update a project, ngResource use post not put
  app.post('/api/project/:projectID', auth.middleware(true), function(req, res) {
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

  //Delete a project
  app.del('/api/project/:projectID', auth.middleware(true), function(req, res) {
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
