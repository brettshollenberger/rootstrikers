var express   = require('express');
var app       = module.exports = express();
var db    = require('./../mongoSchema');

require('../auth')(app,db);
require('./project')(app, db);
require('./feature')(app, db);
require('./page')(app, db);
require('./user')(app, db);
require('./actionkit')(app, db);
