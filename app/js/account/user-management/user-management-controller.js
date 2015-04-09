'use strict';
var util = require('util');
var moment = require('moment');

module.exports = function(app){

  app.controller('userManagementController',
    ['$scope','$location', '$anchorScroll','$cookies', 'userServer', 'auth',
    function($scope, $location, $anchorScroll, $cookies, userServer, auth){

    console.log('loading user management controller');

    // if authorized, set header or redirect
    auth.sendJWT(); 

    $scope.users = {};

    $scope.types = ['fellow', 'wayfarer', 'subscriber', 'dodo'];
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
        (function prepDates () {
          $scope.users.forEach(function (u) {
            var created = moment(u.createdAt);
            u.prettyDate = created.format("dddd, MMMM Do YYYY, h:mm:ss a");
          });
        }());
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
      userServer.destroy(id).success(function (responseStatus) {
        // console.log('Success. Server response: ' + responseStatus);
        $scope.getAll();
      });
    };

    // $scope.goto = function (id) {
    //   $location.hash(id);
    //   $anchorScroll();
    // };

    /**
     *  Init Execute
     */

    $scope.getAll();


  }]);
};