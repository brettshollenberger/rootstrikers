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

function convertToSlug(text, maxLength) {

    maxLength = maxLength || 50;
    
    if(!text) return false;
    
    return text
        .toLowerCase()
        .replace(/ /g, '-')
        .replace(/[^\w\-]+/g, '')
        .substring(0, maxLength);
}

var schema = {}, odmApi = {}, i, entity,
  genericAPI = function(entity) {
    var Model = mongoose.model(entity, schema[entity]);

    return {
      create: function(data, cb) {
        data.id = data.id || new mongoose.Types.ObjectId();
        object = new Model(data);

        object.save(function(err) {
          if(cb){
            cb(err, object);
          }
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
      update: function(id, attributes, cb, isNotObject) {
        delete attributes._id; //cant update id 
        //Maybe later can be change so _id is not sent
        Model.findOneAndUpdate({
          id: (isNotObject) ? id : new mongoose.Types.ObjectId(id)
        }, attributes, function(err, doc) {
          if (cb) {
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
      },
      count: function(conditions, cb) {
        Model.count(conditions, function(err, count) {
          cb(err, count);
        });
      }
    };
  };

schema.project = new mongoose.Schema({
  id: String,
  slug: {
    type: String
  },
  title: {
    type: String
  },
  sub_title: {
    type: String
  },
  problem: {
    type: String
  },
  action: {
    type: String
  },
  goal: {
    type: String
  },
  shortname: {
    type: String
  },
  end_date: {
    type: Date
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
  },
  body: {
    type: String
  }
});

schema.project.pre('save', function(next) {
  this.id = this._id;
  var project = this;
  project.slug = convertToSlug(project.title);
  next(); 
});

schema.page = new mongoose.Schema({
  id: String,
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

schema.page.pre('save', function(next) {
  this.id = this._id;
  next(); 
});

schema.feature = new mongoose.Schema({
  id: String,
  message: {
    type: String,
    required: true
  },
  action: {
    type: String,
    required: true
  },
  actionUrl: {
    type: String,
    required: true
  },
  image: {
    type: String
  },
  InkBlob: {
    type: String
  },
  published: {
    type: Boolean,
    default: false
  }
});


schema.feature.pre('save', function(next) {
  this.id = this._id;
  next(); 
});

schema.user = new mongoose.Schema({
  id: {
    type: String,
    index: {
      unique: true
    }
  },
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  full_name: {
    type: String
  },
  email: {
    type: String,
    required: true,
    index: {
      unique: true
    }
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
  zip: {
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
  actionId: {
    type: String,
    index: true
  }
});

schema.user.pre('save', function(next) {
  var user = this;
  
  this.id = this._id;
  
  this.full_name = this.first_name + ' ' + this.last_name;

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

schema.email = new mongoose.Schema({
  id: {
    type: String,
    index: {
      unique: true
    }
  },
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  subject: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  from: {
    type: String,
    required: true
  },
  vars: {
    type: String
  },
});

schema.action = new mongoose.Schema({
  id: {
    type: String,
    index: {
      unique: true
    }
  },
  project_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'project'
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
  },
  type: {
      type: String,
      default: 'signed'
  },
  date_created: {
    type: Date,
    default: Date.now
  }
});

//Create an API for the models of the schema so db logic get isolate here 
for (entity in schema) {
  odmApi[entity] = genericAPI(entity);
}

// we need to pass these objects here to access them in our seed function
// in ideal situations we'd have a different API setup that eliminated the need for this. :)
odmApi.schema = schema;
odmApi.mongoose = mongoose;

module.exports = odmApi;
