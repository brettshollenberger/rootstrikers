var app = require('./app');

module.exports = app.listen(app.get('port'), '10.1.10.36', function() {
  console.log("Express server listening on port " + app.get('port'));
});
