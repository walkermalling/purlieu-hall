var nodemailer = require('nodemailer');
var util = require('util');

var transporter = nodemailer.createTransport({
  service: 'Mandrill',
  auth: {
      user: 'walker.malling@gmail.com',
      pass: process.env.MANDRILL_SECRET
  }
});

if (!process.env.MANDRILL_SECRET) {
  console.error('No credential set for mailer.');
}

function validateOptions (options) {
  var required = [
    'from',
    'to',
    'subject'
  ];
  required.forEach(function (key) {
    if (!options.hasOwnProperty(key)) {
      return false;
    }
  });
  return true;
}

var mailer = function (options, callback) {
  if (!validateOptions(options)) {
    console.error('Invalid email: ' + util.inspect(options));
    return false;
  }
  transporter.sendMail(options, callback);
};

module.exports = mailer;