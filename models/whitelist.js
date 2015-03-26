'use strict';

var mongoose = require('mongoose');
var mailer = require('../lib/mailer');
var accountTypes = require('../config/permissions');
var cuid = require('cuid');

var WhiteList = mongoose.Schema({
  firstname: String,
  lastname: String,
  email: String, // should be unique
  token: String,
  permission: {type: String, default: 'guest'}
});

WhiteList.methods.generateToken = function () {
  return cuid();
};

WhiteList.methods.invite = function (type) {
  this.token = this.generateToken();
  var accountType = accountTypes.validate(type) ? type : 'guest';
  var message = [
    '<h3>Invitation to the purlieuhall.com</h3>',
    '<p>Dear ', this.firstname, ',</p>',
    '<p>Please create your ',
    accountType,
    'account at purlieuhall.com by following this link:</p>',
    '<p><a href="http://purlieuhall.com/activate?token=',
    this.token,
    '"></a></p>',
    '<p>Sincerely,</p>',
    '<p>The Postmaster</p>'
  ].join();

  var email = {
    from: 'postmaster@gmail.com',
    to: this.email,
    subject: 'Invitation to the Hall',
    html: message
  };

  mailer(email, function (err, response) {
    if (err) {
      console.error(err);
    }
    console.log('Message sent:');
    console.log(response);
  });
};

module.exports = mongoose.model('WhiteList', WhiteList);
