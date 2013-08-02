var express   = require('express');
var app       = module.exports = express();
var db    = require('./../mongoSchema');
var projectAPI = require('./project')(app, db);
