/*    tools:
        list all users
        list all guests
        list all members
        list all dodos
        list all administrators
        list all banned
        
      user actions:
        ban
        set auth level

      other actions
        add pre-approved address
        send invite to [email address]
        create account */

var UserModel = require('../models/user');
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/purlieu-db');
var util = require('util');

function loop (flag) {
  printOptions(); 

  if (flag === false) {
    console.log('goodbye');
    process.exit();
  }

  process.stdin.resume();
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', mainMenu);
}

function mainMenu (input) {
  menuBus(input.trim());
}

var actions = {
  listUsers: listUsers,
  addApprovedEmail: function () {
    console.log('add approved email');
  },
  sendInvitation: function () {
    console.log('send invitation');
  },
  createAccount: function () {
    console.log('create account');
  },
  help: function () {
    printOptions();
  },
  exit: function () {
    loop(false);
  }
};

function menuBus (action) {
  if (actions.hasOwnProperty(action)) {
    actions[action].call();
  } else {
    console.log('menu has no action "' + action + '"');
  }
}

function printOptions() {
  console.log('\nAvailable Actions:');
  Object.keys(actions).forEach(function (act, index) {
    console.log(util.format('- %s', act));
  });
}

function listUsers () {
  console.log('\n');
  UserModel.find({}, function (err, users) {
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

var userActions = {

};

function userActionsBus (users) {
  console.log('user actions:');


}

loop();




