var request = require('request');
var util = require('util');
var _ = require('lodash');
var Book = require('../models/book');

module.exports = function(app) {

  var publicApi = '/api/public/library';
  var adminApi = '/api/admin/library';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) != -1) return true;
    else return false;
  }

  // books

  app.get(publicApi + '/books', function (req, res) {
    if (!req.params) {
        Book.find({
          enable:true
        },
        function (err, books) {
          var sortedItems = _.sortBy(books, 'title');
          if (err) return res.status(500).json(err);
          else res.status(200).send(sortedItems);
        }
      );
    }
  });


  app.post(adminApi = '/books', function (req, res) {
    if (!isAdmin(req.user.permission)) return res.status(401);
    // create new artifact
    var newBook = new Book(req.body);
    newBook.save(function (err, result) {
      if (err) return res.status(500).json(err);
      else return res.status(200).send(result);
    });
  });

  // app.put(adminApi, function (req, res) {
  //   if (!isAdmin(req.user.permission)) return res.status(401);
  //   var x = req.body;
  //   delete x._id;
  //   xschema.findOneAndUpdate({
  //       '_id': req.params.id
  //     }, 
  //     x, 
  //     function(err, data) {
  //       if (err) {
  //         console.log(err);
  //         return res.status(500).send('there was an error');
  //       } else {
  //         res.json(data);
  //       }
  //     }
  //   );
  // });

};