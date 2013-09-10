var express = require('express');
var app = module.exports = express();
var db = require('./../mongoSchema');
var mail = require('./../sendgrid');

var auth = require('../auth')(app, db);
require('./project')(app, db, auth);
require('./page')(app, db, auth);
require('./user')(app, db, mail);
require('./actionkit')(app, db);
require('./email')(app, db, auth);