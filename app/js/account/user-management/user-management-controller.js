'use strict';
var util = require('util');

module.exports = function(app){

  app.controller('userManagementController',
    ['$scope', '$cookies', 'userServer', 'auth',
    function($scope, $cookies, userServer, auth){

    console.log('loading user management controller');

    // if authorized, set header or redirect
    auth.sendJWT(); 

    $scope.users = {};

    $scope.types = ['town', 'country', 'subscriber', 'dodo'];
    $scope.permissions = ['denied', 'guest', 'member', 'dodo', 'admin'];

    /**
     *  Routines
     */
    
    // TODO
    // Process to Invite new users
    // Invite will replace the new user directive

    $scope.getAll = function () {
      userServer.getAll().success(function (users) {
        $scope.users = users;
      });
    };

    $scope.update = function (index) {
      console.log(index);
      console.log($scope.users[index]);
      userServer.update($scope.users[index]).success(function (u) {
        console.log('success');
        console.log(u);
        $scope.getAll();
      });
    };

    $scope.remove = function (id) {
      userServer.destroy(id).success(function (u) {
        console.log('success');
        console.log(u);
        $scope.getAll();
      });
    };

    /**
     *  Init Execute
     */

    $scope.getAll();


  }]);
};