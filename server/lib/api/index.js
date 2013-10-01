var express = require('express');
var app = module.exports = express();
var db = require('./../mongoSchema');
var mail = require('./../sendgrid')(app);
var auth = require('../auth')(app, db);
var path = require('path');
require('./project')(app, db, auth);
require('./page')(app, db, auth);
require('./feature')(app, db);
require('./user')(app, db, mail);
require('./actionkit')(app, db);
require('./email')(app, db, auth);

app.use(express.static(path.resolve('./public')));
