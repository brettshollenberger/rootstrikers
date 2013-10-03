var mongoose = require('mongoose')
  , Action = mongoose.model('action')
  ;

module.exports = function(app, db) {

  //***************************// Get all actions //*********************************//
  
  // 
  var getActionUsers = function(req, res, next) {
  
    // get params and query string vars
    var projectId = req.params.projectId || null;
    var limit = req.query.limit || false;
    
    // build where clause, if we have a project id
    var where = projectId ? { project_id: projectId } : {}; 
    
    //console.log('getting %s actions for project %s ', limit, projectId);
      
    Action
        .find(where)
        .sort('-date_created')
        .limit(limit)
        .populate({
            path: 'user_id'
          , select: 'email'
        })
        .exec(function(err, actions) {
            if(err) return res.json(error);
            
            res.json(actions);
        });
  };
  
  // routes with middleware
  app.get('/api/projects/:projectId/actions', getActionUsers);
  app.get('/api/actions', getActionUsers);
  
  
  
  
  //***************************// Has User Acted //*********************************//
  app.get('/api/actions/hasUserActed', function(req, res) {
  
    var data = req.query;
  
    actions = db.action.find({
      user_id: data.user_id,
      project_id: data.project_id
    },
    function(error, actions) {
      if (!error) {
        res.json(actions);
      } else {
        res.json(error);
      }
    });
  });


  //*****************************// Create //*********************************//
  app.post('/api/actions', function(req, res) {
  
    var data = req.body;

    data.type = data.type || 'signed';

    db.action.create({
      project_id: data.project_id,
      user_id: data.user_id,
      type: data.type
    }, function(error, feature) {
      if (!error) {
        res.json(feature);
      } else {
        res.json(error);
      }
    });
  });

};