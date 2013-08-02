var mongoose = require('mongoose'),
  //Get the configuration from env or use defaults
  config = {
    user: process.env.MONGODB_USER,
    pass: process.env.MONGODB_PASS,
    host: process.env.MONGODB_HOST || 'localhost',
    port: process.env.MONGODB_PORT || '27017',
    db: process.env.MONGODB_DB || 'rootstrikers'
  }, user = '';

if (process.env.MONGOLAB_URI) {
  mongoose.connect(process.env.MONGOLAB_URI);
} else {

  if (config.user && config.pass) {
    user = config.user + ':' + config.pass + '@';
  }
  mongoose.connect('mongodb://' + user + config.host + ':' + config.port + '/' + config.db);
}

var schema = {};

//Create a schema for every 
schema.project = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  }
});

//Create an API for the models of the schema so db logic get isolate here 
var odmApi = {
  Project: (function() {
    //Function so it create a clouse over the model and its available to all methods
    var Model = mongoose.model('Project', schema.project);

    return {
      create: function(data, cb) {
        object = new Model(data);

        object.save(function(err) {
          cb(err, object);
        });
      },
      findAll: function(cb) {
        return Model.find(function(err, projects) {
          cb(err, projects);
        });
      }
    };
  }())
};

module.exports = odmApi;