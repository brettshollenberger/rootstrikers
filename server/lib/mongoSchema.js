var mongoose = require('mongoose'),
    bcrypt = require('bcryptjs'),
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

var schema = {}, odmApi = {}, i, entity,
  genericAPI = function(entity) {
    var Model = mongoose.model(entity, schema[entity]);

    return {
      create: function(data, cb) {
        data.id = new mongoose.Types.ObjectId();
        object = new Model(data);

        object.save(function(err) {
          cb(err, object);
        });
      },
      findAll: function(cb) {
        Model.find(function(err, results) {
          cb(err, results);
        });
      },
      find: function(attributes, cb) {
        Model.find(attributes, function(err, results) {
          cb(err, results);
        });
      },
      update: function(id, attributes, cb) {
        delete attributes._id; //cant update id 
        //Maybe later can be change so _id is not sent
        Model.findOneAndUpdate({
          id: new mongoose.Types.ObjectId(id)
        }, attributes, function(err, doc) {
          if(cb){
            cb(err, doc);
          }
        });
      },
      remove: function(id, cb) {
        Model.findOneAndRemove({
          id: new mongoose.Types.ObjectId(id)
        }, function(err, doc) {
          cb(err, doc);
        });
      }
    };
  };

//Create a schema for every entity
schema.project = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  image: {
    type: String
  },
  InkBlob: {
    type: String
  },
  publish: {
    type: Boolean,
    default: false
  }
});

schema.page = new mongoose.Schema({
  id: mongoose.Schema.Types.ObjectId,
  name: {
    type: String,
    required: true
  },
  url: {
    type: String,
    required: true
  },
  header: {
    type: String
  },
  body: {
    type: String
  },
  publish: {
    type: Boolean,
    default: false
  }
});

schema.user = new mongoose.Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    index: { unique: true }
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: {
    type: String
  },
  isVerify: {
    type: Boolean,
    default: false
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  isFacebook: {
    type: Boolean,
    default: false
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  avatar: {
    type: String
  },
  thumb: {
    type: String
  },
  fbID: {
    type: String
  },
});

schema.user.pre('save', function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(5, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

schema.user.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};

//Create an API for the models of the schema so db logic get isolate here 
for (entity in schema) {
  odmApi[entity] = genericAPI(entity);
}

module.exports = odmApi;