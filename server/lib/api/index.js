var express   = require('express');
var app       = module.exports = express();
var db    = require('./../mongoSchema');
var mail = require('./../sendgrid');

require('../auth')(app,db);
require('./project')(app, db);
require('./feature')(app, db);
require('./page')(app, db);
require('./user')(app, db, mail);
require('./actionkit')(app, db);
require('./email')(app, db);
