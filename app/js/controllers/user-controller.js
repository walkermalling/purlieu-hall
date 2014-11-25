'use strict';

module.exports = function(app){

  app.controller('userController',
    function($scope, $http, $cookies, $base64, $location) {

      if ($location.path() === '/signout') $cookies.jwt = null;
      if (!$cookies.jwt || $cookies.jwt.length >= 10) {
        if ($location.path() != '/' ) {
          console.log('redirecting...');
          return $location.path('/');
        }
      }

      $scope.login = function() {
        console.log('loging in with...');
        console.log($scope.user.email);
        console.log($scope.user.password);
        var credentials = 'Basic' + $base64.encode($scope.user.email + ':' + $scope.user.password);
        console.log(credentials);
        $http.defaults.headers.common.Authorization = credentials;
        $http({
          method: 'GET',
          url: '/api/users'
        })
          .success(function(data) {
            $cookies.jwt = data.jwt;
            $location.path('/dtosaua');
          })
          .error(function(data) {
            console.log('error');
            console.log(data);
          });
      };

      $scope.createUser = function() {
        console.log('requesting new user account...');
        $http({
          method: 'POST',
          url: '/api/users',
          data: $scope.user
        })
          .success(function(data) {
            $cookies.jwt = data.jwt;
            $location.path('/dtosaua');
          })
          .error(function(data) {
            console.log('error');
            console.log(data);
          });
      };

      $scope.validatePassword = function() {
        if ($scope.user.password === $scope.user.passwordConfirmation &&
            $scope.user.password.length >= 5){
          return true;
        }
        return false;
      };



      /* ui logic */

      var $ = require('jquery');
      var menuLinks = $('nav .menu-item > a');
      var menuItems = $('nav .menu-item');

      menuLinks.on('click', function(){

        var $this = $(this);

        if ($this.parents('.menu-item').hasClass('active')){
          $this.parents('.menu-item')
            .removeClass('active');
          menuItems
            .removeClass('supress');
        } else {
          menuItems
            .removeClass('active')
              .not($this.parents('.menu-item'))
              .addClass('supress');
          $this.parents('.menu-item')
            .addClass('active');
        }

      });


  });

};