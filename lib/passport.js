'use strict';

var BasicStrategy = require('passport-http').BasicStrategy;
var User = require('../models/user');

module.exports = function(passport) {

  console.dir('authenticating with passport...');

  passport.use('basic', new BasicStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
    function(email, password, done) {
      console.dir('implementing basic strategy...');

      User.findOne({'basic.email': email}, 
        function(err, user) {

        if(err){
          console.dir('error finding user...');
          return done(err);
        }

        if(!user) {
          console.dir('search returned no matching user');
          return done(null, false);
        }

        if(!user.validPassword(password)) {
          console.dir('pasword did not match');
          return done(null, false);
        }

        console.dir('success...');
        return done(null, user);
        
      });
    })
  );
};
