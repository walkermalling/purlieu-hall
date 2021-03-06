var mongoose = require('mongoose');

var FrontpageItemSchema = mongoose.Schema({
  title: String,
  content: String,
  enable: {type: Boolean, default: false},
  position: {type: Number, default: 0},
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