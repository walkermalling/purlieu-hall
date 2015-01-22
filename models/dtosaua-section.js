'use strict';

var mongoose = require('mongoose');
var itemSchema = require('./dtosaua-item');

var DtosauaSectionSchema = mongoose.Schema({
  title: {type: String, unique: true},
  items: [itemSchema],
  enable: {type: Boolean, default: false},
  position: {type: Number, default: 0},
  accesslevel: {type: String, default: 'member'},
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
});

// Auto update the updatedAt field before model save

DtosauaSectionSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('DtosauaSection', DtosauaSectionSchema);