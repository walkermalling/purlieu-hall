'use strict';

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
     *  Helpers
     */

    function logError (data, status) {
      console.log('Error in Content Server Operation:');
      console.log(data);
      console.log(status);
    }

    /**
     *  Return
     */
    
    return contentServer;

  });
};