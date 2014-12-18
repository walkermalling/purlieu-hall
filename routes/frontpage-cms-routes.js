'use strict';

var FrontpageItem = require('../models/frontpage-item');

module.exports = function(app) {

  var route = '/api/cms/frontpage';

  // get all frontpage items
  
  app.get(route, function (req,res){
    FrontpageItem.find({}, function (err, items) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(items);
    });
  });

  // get one
  
  app.get(route + '/:id', function (req,res){
    FrontpageItem.find({'_id': req.params.id}, function (err, items) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(items);
    });
  });

  // create

  app.post(route, function (req,res){
    var item = new FrontpageItem(req.body);
    item.save(function (err, item) {
      if (err) return res.status(500).json(err);
      else res.status(200).send(item);
    });
  });

  // update
  
  app.put(route + '/:id', function (req,res){
    var item = req.body;
    delete item._id;
    FrontpageItem.findOneAndUpdate({
        '_id': req.params.id
      }, 
      item, 
      function(err, data) {
        if (err) return res.status(500).send('there was an error');
        res.json(data);
      });
  });


  // destroy

  app.delete(route + '/:id', function(req, res) {
    FrontpageItem.remove({'_id': req.params.id}, function(err) {
      if (err) return res.status(500).send('there was an error');
      res.json({msg: 'success!'});
    });
  });


};