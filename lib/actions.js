var UserModel = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/purlieu-db');
var util = require('util');

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

function printOptions () {
  console.log('\nAvailable Actions:');
  Object.keys(actions).forEach(function (act, index) {
    console.log(util.format('- %s', index, act));
  });
}

function listUsers () {

  var query = {};

  if (arguments) {
    var count = 0;
    while(arguments[count]) {
      var arg = arguments[count];
      if (arg['email']) { // update query
        query['basic.email'] = arg.email;
      }
      if (arg['permission']) { // update query
        query['permission'] = arg.permission;
      }
      count++;
    }
  }

  console.log(util.inspect(query));

  UserModel.find(query, function (err, users) {
    if (err) {
      console.log(err);
    } else {
      console.log(util.format('Retrieving %d users:', users.length));
      users.forEach(function (user, index) {
        console.log(util.format('%d. Email: %s\tAuth: %s', index + 1, 
          user.basic.email,
          user.permission));
      });
    }
  });
}

function addApprovedEmail () {

}

function sendInvitation () {

}

function createAccount () {

}



// TODO :: List [all, guests, members, dodos, admins, banned]

// TODO :: User [ban, auth]

// TODO :: Pre-approve [email]

// TODO :: Invite [email]

// TODO :: Create account [*]

module.exports = actions;