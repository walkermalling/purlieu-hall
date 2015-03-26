var mongoose = require('mongoose');
var UserModel = require('../models/user');
var WhiteListModel = require('../models/whitelist');
var BlackListModel = require('../models/blacklist');
var permissionTypes = require('../config/permissions');
var util = require('util');
var fmt = util.format;

// connect

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/purlieu-db');

// Actions

// TODO :: List [all, guests, members, dodos, admins, banned]

// TODO :: User [ban, auth]

// TODO :: Pre-approve [email]

function listUsers () {
  var query = {};

  if (arguments) {
    query = generateQuery(arguments);
  }

  UserModel.find(query, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log(fmt('Retrieving %d users:', users.length));
      users.forEach(function (user, index) {
        console.log(fmt(user.number, user.firstname, user.lastname, user.email,
          user.permission, user.createdAt));
      });
    }
  });
}

function listApprovedEmails () {
  WhiteListModel.find({}, function (err, response) {
    if (err) console.log(err);
    console.log(fmt('Retrieving %d approved emails', response.length));
    response.forEach(function (item) {
      console.log(util.inspect(item));
    });
  });
}

function addApprovedEmail () {
  var query = {};
  if (Object.keys(arguments).length > 0) {
    query = generateQuery(arguments);
  } else {
    console.log('Insufficient args to append to whitelist.');
    return false;
  }

  WhiteListModel.findOne({'email': query.email}, function (err, whitelisted) {
    if (err) console.log(err);
    if (whitelisted) console.log('That email is already whitelisted.');

    var newWhitelister = new WhiteListModel();
    newWhitelister.email = query.email;
    newWhitelister.firstname = query.firstname || '';
    newWhitelister.lastname = query.lastname || '';

    newWhitelister.save(function (err, resWhitelister) {
      if (err) console.log(err);
      else console.log('Success: ' + util.inspect(newWhitelister));
    });
  });
}

function sendInvitation () {
  var query = {};
  if (Object.keys(arguments).length > 0) {
    query = generateQuery(arguments);
  } else {
    console.log('Insufficient args to whitelister.');
    return false;
  }

  WhiteListModel.findOne({'email': query.email}, function (err, whitelisted) {
    if (err) console.log(err);
    var accountType = query.permission || 'guest';
    whitelisted.invite(accountType);    
  });
}

function createAccount () {
  var query = {};

  if (arguments) {
    query = generateQuery(arguments);
  } else {
    return false;
  }
  if (!permissionTypes.validate(query.permission)) {
    console.error('Invalide permission type');
    return false;
  }

  UserModel.findOne({'email': query.email}, function (err, user) {
    if (err) console.log(err);
    if (user) console.log('User already exists with that email.');

    var newUser = new UserModel();
    newUser.email = query.email;
    newUser.password = newUser.generateHash(query.password);
    newUser.permission = query.permission || 'guest';

    newUser.save(function (err, resUser) {
      if (err) console.log(err);
      else console.log('Success: ' + util.inspect(resUser));
    });

  });
}

// HELPERS

function printOptions () {
  console.log('\nAvailable Actions:');
  Object.keys(actions).forEach(function (act, index) {
    console.log(fmt('- %s', index, act));
  });
}

function generateQuery (arguments) {
  var query = {};
  var count = 0;
  while(arguments[count]) {
    var arg = arguments[count];
    for (var key in arg) {
      query[key] = arg[key];
    }
    count++;
  }
  return query;
}

// Action Bus

var actions = {
  listUsers: listUsers,
  listApprovedEmails: listApprovedEmails,
  addApprovedEmail: addApprovedEmail,
  sendInvitation: sendInvitation,
  createAccount: createAccount,
  printOptions: printOptions,
  exit: function () {
    process.exit();
  }
};

module.exports = actions;