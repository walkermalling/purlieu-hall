'use strict';

module.exports = function(app){

  app.controller('dtosauaController', ['$cookies', '$location', 
    function($cookies, $location){

    if (!$cookies.jwt || $cookies.jwt.length < 10) {
      console.log('not authorized');
      $cookies.jwt = null;
      return $location.path('/');
    }

  }]);
};