'use strict';

var util = require('util');

module.exports = function(app) {
  app.factory('userServer', function($http) {

    var userServer = {};

    /**
     *  FrontPage
     */
    
    var userRoute = '/api/admin/users';

    userServer.getAll = function () {
      return $http.get(userRoute)
        .error(logError);
    };

    userServer.getOne = function (id) {
      return $http.get(userRoute + '/' + id)
        .error(logError);
    };

    userServer.create = function (user) {
      return $http.post(userRoute, user)
        .error(logError);
    };

    userServer.update = function (user) {
      console.log('user server service updating ...');
      console.log(user);
      return $http.put(userRoute + '/' + user._id, user)
        .error(logError);
    };

    userServer.destroy = function (id) {
      return $http.delete(userRoute + '/' + id)
        .error(logError);
    };

    /**
     *  Helpers
     */

    function logError (data, status) {
      console.warn(util.format(
        'Error in Calendar Server Operation:\nData: %s\nStatus: %s',
        data,
        status
      ));
    }

    /**
     *  Return
     */
    
    return userServer;

  });
};