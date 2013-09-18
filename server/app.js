
/**
 * Module dependencies.
 */

var express   = require('express');
var path      = require('path');
var api       = require('./lib/api');
var seo       = require('./lib/seo');
var app       = module.exports = express();

app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('change this value to something unique'));
app.use(express.cookieSession());
app.use(express.compress());
app.use(api);
app.use(seo);
app.use(express.static(path.join(__dirname, '../build')));
app.use(app.router);

if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}


// catch all which sends all urls to index page, thus starting our app
// @note that because Express routes are registered in order, and we already defined our api routes
// this catch all will not effect prior routes. 
app.use(function(req, res, next) {
    app.get('*', function(req, res, next) {
        //return res.ok('catch all');
        res.redirect('/#' + req.url);
    });
});