
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

app.get('/loaderio-995e64d5aae415e1f10d60c9391e37ac/', function(req, res, next) {
   res.send('loaderio-995e64d5aae415e1f10d60c9391e37ac'); 
});

if ('development' === app.get('env')) {
    app.use(express.errorHandler());
}

var cacheBuster = function(req, res, next){
    res.header("Cache-Control", "no-cache, no-store, must-revalidate");
    res.header("Pragma", "no-cache");
    res.header("Expires", 0);
    next();
};

// @todo isolate to api routes...
app.use(cacheBuster);

// catch all which sends all urls to index page, thus starting our app
// @note that because Express routes are registered in order, and we already defined our api routes
// this catch all will not effect prior routes. 
app.use(function(req, res, next) {
    app.get('*', function(req, res, next) {
        //return res.ok('catch all');
        res.redirect('/#!' + req.url);
    });
});
