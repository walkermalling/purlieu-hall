'use strict';

var UserModel = require('../models/user');

module.exports = function(app, passport, jwtauth) {

  var apiRoute = '/api/users';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) != -1) return true;
    else return false;
  }

  /**
   * Create a New User
   *   - check for existing user
   *   - hash password
   *   - save to db
   *   - return token
   */

  app.post(apiRoute, function (req, res) {

    UserModel.findOne({
        'basic.email' : req.body.email
      }, 
      function (err, user) {

        if (err) return res.status(500).json(err);
        if (user) return res.status(401).json({'msg':'cannot create user'});

        var newUser = new UserModel();
        newUser.basic.email = req.body.email;
        newUser.basic.password = newUser.generateHash(req.body.password);

        newUser.save(function (err, resUser) {
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
  
  app.get(apiRoute, jwtauth, function (req,res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    UserModel.find({}, function (err, users) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(users);
    });

  });

  /**
   * Get One
   */
  
  app.get(apiRoute + '/:id', jwtauth, function (req,res) {

    var user = req.user._id;
    var sought = req.params.id;

    console.log('user id ' + user);
    console.log('requested ' + sought);

    if (!isAdmin(req.user.permission) || user !== sought) 
      return res.status(401);

    UserModel.findOne({'_id': req.params.id},  {basic : true, name : true}, 
      function (err, user) {
        if (err) return res.status(500).json(err);
        else res.status(200).send(user);
      }
    );

  });

  /**
   *  Update User
   */
  
  app.put(apiRoute + '/:id', jwtauth, function (req, res) {
    
    var user = req.user;
    var update = req.body;

    delete update._id;

    if (!isAdmin(req.user.permission) || user._id !== update._id) 
      return res.status(401);

    if (!isAdmin(req.user.permission) && user._id === update._id)
      delete update.permission;

    UserModel.findONe({'_id':req.params.id}, function (err, user) {

      user.email = update.email;
      user.password = user.generateHash(update.password);
      if (update.permission) user.permission = update.permission;

      user.save(function (err, updatedUser) {
        if (err) return res.status(500).json(err);
        else return res.status(200).send(updatedUser);
      });
    });

  });

  /**
   *  Delete One User
   */
  app.delete(apiRoute + '/:id', jwtauth, function (req, res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    UserModel.remove({'_id': req.params.id}, function (err, user) {
      if (err) return res.status(500).json(err);
      else return res.status(200).send(user);
    });

  });


};
