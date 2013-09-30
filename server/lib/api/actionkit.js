var request = require('request');

module.exports = function(app, db) {
    
    var apiBase = 'https://facultycreative:F8CArey0FBQt@act.demandprogress.org/';
    var apiVersion = 'rest/v1';
    
    app.post('/api/actionkit/createUser', function(req, res, next) {
    
        var url = apiBase + apiVersion + '/user/';
       
        request({method:'POST', uri:url, body:req.body, headers:{'Content-Type':'application/json'}, json:true}, function (error, response, body) {
          
          if (!error && response.statusCode == 201) {
          
            // get the user id of the returned ActionKit user
            var segment_str = response.headers.location;
            var segment_array = segment_str.split( '/' );
            var last_segment = segment_array[segment_array.length - 2];
          
            res.send({error:false, response:last_segment});
          } else {
            res.send({error:true});
          }
          
        }); 

    });
    
    app.get('/api/actionkit/getUser', function(req, res, next) {
    
        var url = apiBase + apiVersion + '/user/?email=' + req.query.email;
       
        request({method:'GET', uri:url, json:true}, function (error, response, body) {
          
          if (!error && response.statusCode == 200 && body.meta.total_count === 1) {
            res.send({error:false, response:body.objects[0]});
          } else {
            res.send({error:true});
          }
          
        }); 
        
    });
    
    app.get('/api/actionkit/getPage', function(req, res, next) {
       
        var url = apiBase + apiVersion + '/page/?name=' + req.query.shortname;
       
        request({uri:url, json:true}, function (error, response, body) {
          
          if (!error && response.statusCode == 200 && body.meta.total_count === 1) {
            res.send({error:false, response:body.objects[0]});
          } else {
            res.send({error:true});
          }
          
        });
        
    });
    
    app.get('/api/actionkit/getPetitionForm', function(req, res, next) {
       
        var url = apiBase + req.query.petitionFormUrl;
       
        request({uri:url, json:true}, function (error, response, body) {
          
          if (!error) {
            res.send({error:false, response:body});
          } else {
            res.send({error:true});
          }
          
        });
        
    });
    
    app.post('/api/actionkit/doAction', function(req, res, next) {
    
        var url = apiBase + apiVersion + '/action/';
       
        request({method:'POST', uri:url, body:req.body, headers:{'Content-Type':'application/json'}, json:true}, function (error, response, body) {      
          
          if (!error && response.statusCode == 201) {
            res.send({error:false});
          } else if(!error && response.statusCode == 400) {
              if(body.errors) {
                res.send({error:true, errors:body.errors});
              } else {
                res.send({error:true});
              }
          } 
          else {
              res.send({error:true});
          }
          
        }); 
    });
    
};