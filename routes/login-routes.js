'use strict';

// var UserModel = require('../models/user');

module.exports = function(app, passport) {

  var apiRoute = '/api/login';

  /**
   * Log in User
   */
  
  app.get(apiRoute,
    passport.authenticate('basic', {session: false}),
    function(req, res) {
      res.json({
        'jwt': req.user.createToken(app)
      });
    }
  );


};
