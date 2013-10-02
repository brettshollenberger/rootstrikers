module.exports = function(app, db) {

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

    db.action.create({
      project_id: data.project_id,
      user_id: data.user_id
    }, function(error, feature) {
      if (!error) {
        res.json(feature);
      } else {
        res.json(error);
      }
    });
  });

};