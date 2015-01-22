'use strict';

var DtosauaItem = require('../models/dtosaua-item');
var _ = require('lodash');

module.exports = function(app) {

  var route = '/api/dtosaua/items';

  // get all public items
  
  app.get(route, function (req,res) {
    DtosauaItem.find({
        enable:true     // match record on 'enable' field
      },{
        _id: false,     // specify which fields to return
        title: true,
        content: true,
        parent: true
      },                // middleware to sort records
      function (err, items) {
        var sortedItems = _.sortBy(items, 'position');
        if (err) return res.status(500).json(err);
        else res.status(200).send(sortedItems);
      });
  });

};