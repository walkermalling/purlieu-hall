'use strict';

// var FrontpageItem = require('../models/frontpage-item');
// var _ = require('lodash');

module.exports = function(app) {

  var publicApi = '/api/public/calendar';
  var adminApi = '/api/admin/calendar';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) !== -1) return true;
    else return false;
  }

  // get all public events

  app.get(publicApi, function (req,res) {

    // query google api
    // use request

  });

};