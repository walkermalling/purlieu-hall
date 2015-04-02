'use strict';

var util = require('util');

/**
 *  Service used only for GET requests to site content
 */

module.exports = function(app) {
  app.factory('contentServer', function($http) {

    var contentServer = {};

    /**
     *  FrontPage
     */
    
    var frontPageRoute = '/api/public/frontpage';
    contentServer.frontPageItem = {};

    contentServer.frontPageItem.getAll = function () {
      return $http.get(frontPageRoute)
        .error(logError);
    };

    /**
     *  Dtosaua
     */
    
    var dtosauaRoute = '/api/dtosaua/sections';
    contentServer.dtosauaSections = {};

    contentServer.dtosauaSections.getAll = function () {
      return $http.get(dtosauaRoute)
        .error(logError);
    };

    /**
     *  Helpers
     */

    function logError (data, status) {
      console.warn(util.format(
        'Error in Content Server Operation:\nData: %s\nStatus: %s',
        data,
        status
      ));
    }

    /**
     *  Return
     */
    
    return contentServer;

  });
};