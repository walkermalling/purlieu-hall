'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var UserSchema = mongoose.Schema({
  basic: {
    email: String,
    password: String
  },
  name: {type: String, default: 'Fellow'},
  jwt: String,
  permission: {type: String, default: 'denied'},
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
});

// Auto update the updatedAt field before model save

UserSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

// Encrypt the Password

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Validate Password

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

// Create JWT Token

UserSchema.methods.createToken = function(app) {
  console.dir('creating token');

  var expires = moment().add(7, 'days').valueOf(); 
  var self = this;

  var token = jwt.encode({
    iss: self._id,
    expires: expires,
    permission: self.permission
  }, app.get('jwtTokenSecret'));
  
  console.dir(token);

  return token;
};

module.exports = mongoose.model('User', UserSchema);
