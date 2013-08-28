var request = require('request');

module.exports = function(app, db) {
    
    var apiBase = 'https://facultycreative:F8CArey0FBQt@act.demandprogress.org/rest/v1/';
    
    /*
    app.post('/api/actionkit/createUser', function(req, res, next) {

        console.log(req.body);
       
        request.post('https://act.demandprogress.org/rest/v1/user/', function (error, response, body) {
          console.log(error);
          //console.log(response);
          
          if (!error && response.statusCode == 200) {
            //console.log(body) // Print the google web page.
            res.send('success');
          } else {
            res.send('you are awesome, but your request failed');
          }
          
        }) 
        
    });
    */
    
    app.get('/api/actionkit/getPage', function(req, res, next) {
       
        var url = apiBase + 'page/?name=' + req.query.shortname;
       
        request({uri:url, json:true}, function (error, response, body) {
          
          if (!error && response.statusCode == 200 && body.meta.total_count === 1) {
            res.send({error:false, response:body.objects[0]});
          } else {
            res.send({error:true});
          }
          
        });
        
    });
    
};