'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jwt-simple');
var moment = require('moment');

var UserSchema = mongoose.Schema({
  email: String, // should be unique
  password: String,
  jwt: String,
  type: String,
  number: Number,
  firstname: String,
  lastname: String,
  phone: String,
  address: String,
  city: String,
  state: String,
  zip:String,
  permission: {type: String, default: 'dodo'}, 
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
  return bcrypt.compareSync(password, this.password);
};

// Create JWT Token

UserSchema.methods.createToken = function(app) {

  var expires = moment().add(7, 'days').valueOf(); 
  var self = this;

  var token = jwt.encode({
    iss: self._id,
    expires: expires,
    permission: self.permission
  }, app.get('jwtTokenSecret'));

  return token;
};

// Convenience Methods

UserSchema.methods.fullName = function () {
  return this.firstname + ' ' + this.lastname;
};

UserSchema.methods.memberId = function () {
  var map = {'town': 'T', 'dodo': 'D', 'country' : 'C'};
  return map[this.type] + this.number;
};

UserSchema.methods.fullAddress = function () {
  return this.address + ' ' + this.city + ' ' + this.state + ' ' + this.zip;
};

module.exports = mongoose.model('User', UserSchema);
