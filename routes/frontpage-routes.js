'use strict';

var FrontpageItem = require('../models/frontpage-item');
var _ = require('lodash');

module.exports = function(app) {

  var route = '/api/public/frontpage';

  // get all public items
  
  app.get(route, function (req,res){
    FrontpageItem.find({
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
      });
  });

};