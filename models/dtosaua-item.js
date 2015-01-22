'use strict';

var mongoose = require('mongoose');

var DtosauaItemSchema = mongoose.Schema({
  title: String,
  content: String,
  parent: String,
  enable: {type: Boolean, default: false},
  position: {type: Number, default: 0},
  accesslevel: {type: String, default: 'member'},
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
});


// Auto update the updatedAt field before model save

DtosauaItemSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});



module.exports = mongoose.model('DtosauaItem', DtosauaItemSchema);