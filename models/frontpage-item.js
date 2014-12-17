'use strict';

var mongoose = require('mongoose');
// var jwt = require('jwt-simple');
// var moment = require('moment');

var FrontpageItemSchema = mongoose.Schema({
  label: String,
  heading: String,
  content: String,
  enable: {type: Boolean, default: false},
  accesslevel: {type: String, default: 'public'},
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
});


// Auto update the updatedAt field before model save

FrontpageItemSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});



module.exports = mongoose.model('FrontpageItem', FrontpageItemSchema);