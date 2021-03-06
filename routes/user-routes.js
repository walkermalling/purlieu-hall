'use strict';

var UserModel = require('../models/user');

module.exports = function(app, passport, jwtauth) {

  var publicApi = '/api/users';
  var adminApi = '/api/admin/users';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) !== -1) return true;
    else return false;
  }

  /**
   * Create a New User
   *
   * Note: Does not use jwtauth middleware
   * 
   */

  app.post(publicApi, function (req, res) {

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
    
  });

  /**
   *  Administrative User Routes
   */

  /**
   * Get All Users
   */
  
  app.get(adminApi, jwtauth, function (req,res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    UserModel.find({}, function (err, users) {
        if (err) return res.status(500).json(err);
        else res.status(200).send(users);
      }
    );

  });

  /**
   * Get One
   */
  
  app.get(adminApi + '/:id', jwtauth, function (req,res) {

    // find and return user's basic attributes

    UserModel.findOne({'_id': req.params.id},  {'email': 1, 'name': 1}, 
      function (err, user) {
        if (err) return res.status(500).json(err);
        else res.status(200).send(user);
      }
    );

  });


  /**
   *  Update User
   */
  
  app.put(adminApi + '/:id', jwtauth, function (req, res) {
    
    var user = req.user;
    var update = req.body;

    // only allow admins and the user whose record this is to update it

    if (!isAdmin(req.user.permission) && user._id !== update._id)
      return res.statusStatus(401);

    // is it is the current user's record, and user is not an admin
    // do not allow them to modify permission
  
    if (!isAdmin(req.user.permission) && user._id === update._id)
      delete update.permission;

    // remove id so that the update does not attempt to overwrite

    delete update._id;

    // make updatedAt current

    update.updatedAt = new Date();

    // find and update

    UserModel.findOneAndUpdate({
        '_id': req.params.id
      }, 
      update, 
      function(err, data) {
        if (err) return res.status(500).send('there was an error');
        else return res.status(200).json({'msg':data});
      }
    );

  });

  /**
   *  Delete One User
   */
  
  app.delete(adminApi + '/:id', jwtauth, function (req, res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    UserModel.remove({'_id': req.params.id}, function (err, response) {
      if (err) return res.status(500).json(err);
      else return res.sendStatus(200);
    });

  });


};
