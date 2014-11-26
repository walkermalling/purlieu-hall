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
  jwt: String,
  created_at: {type: Date, default: Date.now }
});

UserSchema.methods.generateHash = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

UserSchema.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.basic.password);
};

UserSchema.methods.createToken = function(app) {
  console.dir('creating token');

  var expires = moment().add(7, 'days').valueOf(); 
  var self = this;

  var token = jwt.encode({
    iss: self._id,
    expires: expires
  }, app.get('jwtTokenSecret'));
  
  console.dir(token);

  return token;
};

module.exports = mongoose.model('User', UserSchema);
