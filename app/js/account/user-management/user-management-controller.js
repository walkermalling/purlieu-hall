'use strict';

module.exports = function(app){

  app.controller('userManagementController', ['$scope', 'userServer', 'auth',
    function($scope, userServer, auth){

    console.log('loading user management controller');

    // if authorized, set header or redirect
    auth.sendJWT(); 

    $scope.users = {};

    /**
     *  Routines
     */

    $scope.getAll = function () {
      userServer.getAll().success(function (users) {
        $scope.users = users;
      });
    };

    /**
     *  Init Execute
     */

    $scope.getAll();

    console.log(!!userServer);


  }]);
};