'use strict';

var _ = require('lodash');

var DtosauaSection = require('../models/dtosaua-section');
// var DtosauaItem = require('../models/dtosaua-item');

module.exports = function(app, jwtauth) {

  var route = '/api/cms/dtosaua';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) != -1) return true;
    else return false;
  }

  /**
   * Get All
   */
  
  app.get(route, jwtauth, function (req,res){

    if (!isAdmin(req.user.permission)) return res.status(401);

    DtosauaSection.find({}, function (err, sections) {
      if (err) return res.status(500).json(err);

      var sortedItems = _.sortBy(sections, 'position');
      res.status(200).send(sortedItems);
    });

  });

  /** 
   * Get One
   */
  
  app.get(route + '/:id', jwtauth, function (req,res){

    if (!isAdmin(req.user.permission)) return res.status(401);

    DtosauaSection.find({'_id': req.params.id}, function (err, sections) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(sections);
    });

  });

  /**
   * Create
   */

  app.post(route, jwtauth, function (req,res){

    if (!isAdmin(req.user.permission)) return res.status(401);

    var section = new DtosauaSection(req.body);
    section.save(function (err, section) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(section);
    });

  });

  /**
   * Update
   */
  
  app.put(route + '/:id', jwtauth, function (req,res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    var section = req.body;
    delete section._id;

    console.log(req.body);

    DtosauaSection.findOneAndUpdate({
        '_id': req.params.id
      }, 
      section, 
      function(err, data) {
        if (err) {
          console.log(err);
          return res.status(500).send('there was an error');
        } else {
          res.json(data);
        }
        
      }
    );

  });


  /**
   * Destroy
   */

  app.delete(route + '/:id', jwtauth, function(req, res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    DtosauaSection.remove({'_id': req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'success!'});
    });
    
  });


};