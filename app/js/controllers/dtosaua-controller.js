'use strict';

module.exports = function(app){

  app.controller('dtosauaController', ['$cookies', '$location', '$scope',
    function($cookies, $location, $scope){

    if (!$cookies.jwt || $cookies.jwt.length < 10) {
      console.log('not authorized');
      $cookies.jwt = null;
      return $location.path('/');
    }

    $scope.menu = {
      selection : 'home',
      select: function(section){
        $scope.menu.selection = section || 'home';
      }
    };



  }]);
};