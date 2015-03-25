var UserModel = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/purlieu-db');
var util = require('util');
var fmt = util.format;
var permissionTypes = require('../config/permissions');

// Action Bus

var actions = {
  listUsers: listUsers,
  addApprovedEmail: addApprovedEmail,
  sendInvitation: sendInvitation,
  createAccount: createAccount,
  printOptions: printOptions,
  exit: function () {
    process.exit();
  }
};

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

function addApprovedEmail () {

}

function sendInvitation () {

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
  console.log(query);
  return query;
}



module.exports = actions;