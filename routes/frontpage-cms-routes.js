'use strict';

var FrontpageItem = require('../models/frontpage-item');

module.exports = function(app, jwtauth) {

  var route = '/api/cms/frontpage';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) != -1) return true;
    else return false;
  }

  // get all frontpage items
  
  app.get(route, jwtauth, function (req,res){

    if (!isAdmin(req.user.permission)) return res.status(401);

    FrontpageItem.find({}, function (err, items) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(items);
    });

  });

  // get one
  
  app.get(route + '/:id', jwtauth, function (req,res){

    if (!isAdmin(req.user.permission)) return res.status(401);

    FrontpageItem.find({'_id': req.params.id}, function (err, items) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(items);
    });

  });

  // create

  app.post(route, jwtauth, function (req,res){

    if (!isAdmin(req.user.permission)) return res.status(401);

    var item = new FrontpageItem(req.body);
    item.save(function (err, item) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(item);
    });

  });

  // update
  
  app.put(route + '/:id', jwtauth, function (req,res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    var item = req.body;
    delete item._id;

    FrontpageItem.findOneAndUpdate({
        '_id': req.params.id
      }, 
      item, 
      function(err, data) {
        if (err) return res.status(500).send('there was an error');
        res.json(data);
      }
    );

  });


  // destroy

  app.delete(route + '/:id', jwtauth, function(req, res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    FrontpageItem.remove({'_id': req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'success!'});
    });
    
  });


};