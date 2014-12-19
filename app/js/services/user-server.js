'use strict';

module.exports = function(app) {
  app.factory('userServer', function($http) {

    var userServer = {};

    /**
     *  FrontPage
     */
    
    var userRoute = '/api/admin/user';

    userServer.getAll = function () {
      return $http.get(userRoute)
        .error(logError);
    };

    userServer.getOne = function (id) {
      return $http.get(userRoute + '/' + id);
        .error(logError);
    };

    userServer.create = function (user) {
      return $http.post(userRoute, user)
        .error(logError);
    };

    userServer.update = function (user) {
      return $http.put(userRoute + '/' + user._id, user)
        .error(logError);
    };

    cmsServer.destroy = function (id) {
      return $http.delete(userRoute + '/' + id)
        .error(logError);
    };

    /**
     *  Helpers
     */

    function logError (data, status) {
      console.log('Error in User Server Operation:');
      console.log(data);
      console.log(status);
    }

    /**
     *  Return
     */
    
    return userServer;

  });
};