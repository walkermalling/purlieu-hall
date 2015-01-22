'use strict';

var DtosauaSection = require('../models/dtosaua-section');
var _ = require('lodash');

module.exports = function(app) {

  var route = '/api/dtosaua/sections';

  // permission helper
  
  // function isMember (permission) {
  //   if (['dodo', 'admin', 'member'].indexOf(permission) !== -1) 
  //     return true;
  //   else 
  //     return false;
  // }

  // get all public items
  
  app.get(route, function (req,res) {

    // if (!isMember(req.user.permission)) return res.status(401);

    DtosauaSection.find({
        enable:true
      },{
        _id: false,
        title: true,
        content: true
      },
      function (err, items) {
        var sortedItems = _.sortBy(items, 'position');
        if (err) return res.status(500).json(err);
        else res.status(200).send(sortedItems);
      }
    );

  });

};