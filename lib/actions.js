var mongoose = require('mongoose');
var UserModel = require('../models/user');
var WhiteListModel = require('../models/whitelist');
var BlackListModel = require('../models/blacklist');
var util = require('util');
var fmt = util.format;

// connect

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/purlieu-db');

// Action Bus

var actions = {
  listUsers: listUsers,
  listApprovedEmails: listApprovedEmails,
  addApprovedEmail: addApprovedEmail,
  sendInvitation: sendInvitation,
  createAccount: createAccount,
  printOptions: printOptions,
  exit: function () {
    console.log('Goodbye!');
    process.exit();
  }
};

// Actions

// TODO :: List [all, guests, members, dodos, admins, banned]

// TODO :: User [ban, auth]

// TODO :: Pre-approve [email]

function listUsers () {
  var query = {};

  if (arguments[2]) {
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
  var done = arguments[0];
  WhiteListModel.find({}, function (err, response) {
    if (err) {
      console.log(err);
      arguments[2]();
    }
    console.log(fmt('Retrieving %d approved emails', response.length));
    response.forEach(function (item) {
      console.log(util.inspect(item));
    });
    done();
  });
}

function addApprovedEmail () {
  var query = generateQuery(arguments);
  if (!query) return;
  if (!query.email) return;

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
  var query = generateQuery(arguments);
  if (!query) return;

  WhiteListModel.findOne({'email': query.email}, function (err, whitelisted) {
    if (err) console.log(err);
    var accountType = query.permission || 'guest';
    whitelisted.invite(accountType);    
  });
}

function createAccount () {
  var query = generateQuery(arguments);
  if (!query) return;
  if (!validatePermission(query.permission)) {
    console.error('Invalide permission type');
    return;
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

function generateQuery (fullArgs) {
  var args = fullArgs[2];
  if (args.length === 0) return false;

  var query = {};
  var count = 0;
  while(args[count]) {
    var arg = args[count];
    for (var key in arg) {
      query[key] = arg[key];
    }
    count++;
  }
  return query;
}



function validatePermission (type) {
  var permissionTypes = [
    'guest',
    'member',
    'dodo',
    'admin'
  ];

  if (permissionTypes.indexOf(type) !== -1) {
    return true;
  } else {
    return false;
  }
}

module.exports = actions;