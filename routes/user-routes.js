'use strict';

var UserModel = require('../models/user');

module.exports = function(app, passport) {

  var apiRoute = '/api/users';
  /**
   * Create a New User
   *   - check for existing user
   *   - hash password
   *   - save to db
   *   - return token
   */

  app.post(apiRoute, function(req, res) {

    UserModel.findOne({
        'basic.email' : req.body.email
      }, 
      function(err, user) {
        if (err) {
          console.dir('error searching for user!');
          return res.status(500).json(err);
        }
        if (user) {
          console.dir('user already exists!');
          return res.status(401).json({
            'msg':'cannot create user'
          });
        }

        var newUser = new UserModel();
        newUser.basic.email = req.body.email;
        newUser.basic.password = newUser.generateHash(req.body.password);

        newUser.save(function(err, resUser) {
          if (err) return res.status(500).json(err);
          else return res.status(200).json({
            'jwt': resUser.createToken(app)
          });
        });

      }
    );
    
  });

  /**
   * Get All Users
   */
  
  app.get(apiRoute,
    passport.authenticate('basic', {session: false}),
    function(req,res){
      UserModel.find({},
        function(err, users) {
          if (err) return res.status(500).json(err);
          else res.status(200).send(users);
        }
      );
    }
  );


  /**
   * Delete Users
   */
  
  // app.delete(apiRoute, function(req, res) {
  //   UserModel.remove({}, function(err) {
  //     if (err) {
  //       return res.status(500).json(err);
  //     }
  //     return res.status(200).json({
  //       'message': 'deleted'
  //     });
  //   });
  // });

};
