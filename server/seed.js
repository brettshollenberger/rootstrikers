/**
* Module to seed a database.
* 
* @todo re-write to use async to reduce the nested function, and quit on completion
* @todo make model loading more effecient
*
*/

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    _ = require('underscore'),
    fs = require('fs');
    
var async = require('async');


/**
* Require our models definition
*
*/
var db = require('./lib/mongoSchema');

//console.log(db.mongoose.connections[0].collections);

// Saving in array allows us to call below in doSeed function.
// @todo make dynamic to load models automatically.
var models = {};
models.project = mongoose.model('project');
models.feature = mongoose.model('feature');
models.user = mongoose.model('user');
models.email = mongoose.model('email');
models.page = mongoose.model('page');


/**
* Get our seed data
* @note again this is not the most elegant, we should be doing something
* more automated based on model files... ie: check if seed data exists then add it to our array
*
* @note we sould include some type of functionality to automatically pluralize / depluralize names
* Keep in mind we might need to call in a specific order
*
*/
var resources = {};
resources.project          = require('./seed_data/project').seed();
resources.feature        = require('./seed_data/feature').seed();
resources.user       = require('./seed_data/user').seed();
resources.email        = require('./seed_data/email').seed();
resources.page       = require('./seed_data/page').seed();


db.connection = db.mongoose.connections[0];

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */
/*
var env = process.env.NODE_ENV || 'development',
    config = require('./config/config')[env],
    mongoose = require('mongoose');
*/
    
// create database connection
//var db = mongoose.connect(config.db, function() {
    //console.info('Connected to ' + env + ' database!');
    
    // Drop all our defined collections using async.
    // this prevents from dropping the whole db, which prevents us from logging back in
    // because it drops the high level users collection that mongo uses to register access
    var doDrops = [];

    // here we access the db collections
    // as defined by the database itself. 
    // this is instead of dropping the whole database, which disconnects us from mongolab
    _.each(db.connection.collections, function(collection) {
        
        var name = collection.name;
        console.info('Prepping ' + name + ' for dropping');
        
        var dropFunction = function(callback) {
            collection.drop( function(err) {
                console.info('Collection ' + name + ' dropped');
                callback();
            });
        };
        
        doDrops.push(dropFunction);
        
    });
    
    
    async.series(doDrops, function() {
        // call seeding function
        doSeed();
    });

//});


/**
* Function to do the actual seed. Will be called once database is dropped, 
* and the connection is closed and re-opened.
*
*/
var doSeed = function() {
    
    var needsSeed = [];
    
    // loop through resources
    _.each(resources, function(value, key) {
        
        console.info('Registering ' + key + ' collection for seeding');
        
        // loop through our resource items
        _.each(value, function(contents) {
            
            // carete new Mongoose object
            var item = new db.connection.base.models[key](contents);
        
            // define our seed function, with references to item 
            var doThis = function(callback) {
                
                // save mongo object
                item.save(function(err, data) {
                    if(err) throw(err);
                    console.info(key + ' ' + item._id + ' created.');
                    // async serices will pass param whcih is callbacl
                    // first param is error, second is result
                    callback(null, item);
                }); 
                
            };
            
            // Push to our seeding function array
            needsSeed.push(doThis);
  
        });

    });
    
    /**
    * Perform the seed, then exit on success
    * async.series() will run an array of functions. 
    * Each should have a callback, which will be the first param
    *
    */
    async.series(needsSeed, function() {
        process.exit();
    });
    
};