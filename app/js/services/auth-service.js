'use strict';

module.exports = function(app) {
  app.factory('auth', function($http, $cookies, $location) {
    var auth = {
      sendJWT: function() {
        if (!$cookies.jwt || $cookies.jwt.length < 10){
          $location.path('/');
          return 'noauth';
        } 
        else {
          $http.defaults.headers.common.jwt = $cookies.jwt;
        }
      }
    };

    return auth;
  });
};