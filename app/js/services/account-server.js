'use strict';

module.exports = function(app) {
  app.factory('accountServer', function($http, $cookies, $location) {

    var accountServer = {};

    function logError (err) {
      console.log('Error');
      console.log(err);
    }

    accountServer.signin = function () {
      return $http.get('/api/login')
        .error(logError);
    };

    accountServer.signout = function () {
      console.log('signout requested, nullifying cookie...');
      $cookies.jwt = null;
      return $location.path('/');
    };

    accountServer.createUser = function (credentials) {
      return $http.post('/api/users', credentials)
        .error(logError);
    };

    return accountServer;

  });
};