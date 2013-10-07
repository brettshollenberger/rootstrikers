var mongoose = require('mongoose')
  , Action = mongoose.model('action')
  , User = mongoose.model('user')
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
          , select: 'email full_name'
        })
        .populate('project_id')
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
  
  var makeAction = function(res, data, userId) {
    
    Action
        .findOne({user_id : userId, project_id: data.project_id})
        .exec(function(err, action) {
            
            if(err) return res.json(error);
              
            if(!action) {
               // no action found, make one 
               db.action.create({
                  project_id: data.project_id,
                  user_id: userId,
                  type: data.type
                }, function(error, feature) {
                  if (!error) {
                    res.json(feature);
                  } else {
                    res.json(error);
                  }
                });
                
            } else {
                return res.send('User already signed');
            } 
        });
  };
  
  app.post('/api/actions', function(req, res) {
  
    var data = req.body;
    var user = data.user;
    var userId;

    data.type = data.type || 'signed';
        
    // check if their email exists in the database
    User
    .findOne({ email: user.email })
    .exec(function(err, dbUser) {
    
        if(err) return res.json(error);
        
        // if we returned a user
        if(dbUser && dbUser.id) {
            // add user id to the action object and save 
            userId = dbUser.id;
            makeAction(res, data, userId);            
        } else {
            // else make a new user and save
            var makeUser = {
                first_name: user.firstName,
                last_name: user.lastName,
                email: user.email
            };
            
            var newUser = new User(makeUser);
            newUser.save(function(err, item) {
               userId = item.id;
               makeAction(res, data, userId);
            });
        }
        
    });
    
  });

};