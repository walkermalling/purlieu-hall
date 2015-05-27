var mongoose = require('mongoose');

var BookSchema = mongoose.Schema({
  title:      {type: String},
  subtitle:   {type: String},
  author:     {type: String},
  published:  {type: Date, default: null},
  house:      {type: String},
  isbn:       {type: String},
  hallCollection: {type: String},
  location:   {type: String},
  donatedBy:  {type: String},
  donatedOn:  {type: Date},
  notes:      {type: String},
  enable:     {type: Boolean, default: true},
  createdAt:  {type: Date, default: Date.now },
  updatedAt:  {type: Date, default: Date.now }
});

// Auto update the updatedAt field before model save

BookSchema.pre('save', function (next) {
  this.updatedAt = new Date();
  next();
});

module.exports = mongoose.model('Book', BookSchema);