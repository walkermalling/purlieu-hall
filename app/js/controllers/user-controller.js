'use strict';

module.exports = function(app){

  app.controller('userController',
    function($scope, $http, $cookies, $base64, $location) {
      if ($location.path() === '/signout')
        $cookies.jwt = null;

      if (!$cookies.jwt || $cookies.jwt.length >= 10)
        return $location.path('/');

      $scope.signin = function() {
        $http.defaults.headers.common.Authorization = 'Basic' + $base64.encode($scope.user.email + ':' + $scope.user.password);
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
        return $scope.user.password === $scope.user.passwordConfirmation;
      };


  });

};