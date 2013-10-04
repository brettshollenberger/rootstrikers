var express = require('express');
var app = module.exports = express();
var db = require('./../mongoSchema');
var mail = require('./../sendgrid')(app);
var auth = require('../auth')(app, db);
var path = require('path');
require('./action')(app, db, auth);
require('./actionkit')(app, db);
require('./email')(app, db, auth);
require('./feature')(app, db);
require('./page')(app, db, auth);
require('./project')(app, db, auth);
require('./user')(app, db, mail);

app.use(express.static(path.resolve('./public')));
