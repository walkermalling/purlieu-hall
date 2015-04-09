'use strict';

var request = require('request');
var util = require('util');
var _ = require('lodash');

module.exports = function(app) {

  var publicApi = '/api/public/library';
  var adminApi = '/api/admin/library';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) != -1) return true;
    else return false;
  }

  app.get(publicApi, function (req, res) {

    // if params in get request, process them

  });

  app.get(publicApi + '/:index', function (req, res) {

    // if params in get request, process them

    // fetch index

  });

  app.post(adminApi, function (req, res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    // create new artifact

    var x = new DtosauaSection(req.body);
    x.save(function (err, x) {
      if (err) return res.status(500).json(err);
      else return res.status(200).send(x);
    });

  });

  app.put(adminApi, function (req, res) {

    if (!isAdmin(req.user.permission)) return res.status(401);

    var x = req.body;
    delete x._id;

    xschema.findOneAndUpdate({
        '_id': req.params.id
      }, 
      x, 
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

  // TODO: delete record

};