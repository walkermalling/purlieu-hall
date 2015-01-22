'use strict';

/**
 * Define the model for Dtosaua-Item
 * Child Document to Dtosaua-Section
 */

var mongoose = require('mongoose');

var DtosauaItemSchema = mongoose.Schema({
  subtitle: {type: String},
  content: {type: String},
  position: {type: Number, default: 0},
  enable: {type: Boolean, default: false},
  createdAt: {type: Date, default: Date.now },
  updatedAt: {type: Date, default: Date.now }
});

// Auto update the updatedAt field before model save

DtosauaItemSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('DtosauaItem', DtosauaItemSchema);