var express   = require('express');
var app       = module.exports = express();
var db    = require('./../mongoSchema');

require('./project')(app, db);
require('./page')(app, db);
