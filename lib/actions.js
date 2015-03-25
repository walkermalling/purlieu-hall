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
        query['email'] = arg.email;
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
          user.email,
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

  var query = {};

  if (arguments) {
    var count = 0;
    while(arguments[count]) {
      var arg = arguments[count];
      if (arg['email']) { // update query
        query['email'] = arg.email;
      }
      if (arg['permission']) { // update query
        query['permission'] = arg.permission;
      }
      count++;
    }
  }

  UserModel.findOne({'email': req.body.email}, function (err, user) {

    if (err) return res.status(500).json(err);

    if (user) return res.status(401).json({'msg':'cannot create user'});

    var newUser = new UserModel();
    newUser.email = req.body.email;
    newUser.password = newUser.generateHash(req.body.password);

    newUser.save(function (err, resUser) {

      if (err) return res.status(500).json(err);

      else return res.status(200).json({'jwt': resUser.createToken(app)});

    });

  });
}



// TODO :: List [all, guests, members, dodos, admins, banned]

// TODO :: User [ban, auth]

// TODO :: Pre-approve [email]

// TODO :: Invite [email]

// TODO :: Create account [*]



// HELPERS



module.exports = actions;