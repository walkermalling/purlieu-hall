'use strict';

var mongoose = require('mongoose');

var BlackList = mongoose.Schema({
  email: String,
  ip: String
});

module.exports = mongoose.model('BlackList', BlackList);