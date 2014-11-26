'use strict';

module.exports = function(app){

  app.controller('newUserController', [
    '$scope', '$http', '$cookies', '$location',
    function($scope, $http, $cookies , $location) {

      $scope.createUser = function() {
        
        $http.post('/api/users', {
          'email': $scope.user.newEmail,
          'password': $scope.user.newPassword
        })
          .success(function(data) {
            $cookies.jwt = data.jwt;
            $http.defaults.headers.common.jwt = data.jwt;
            $location.path('/dtosaua');
          })
          .error(function(data) {
            console.log('error creating user');
            console.log(data);
          });
      };

      $scope.validatePassword = function() {
        if ($scope.user.newPassword === $scope.user.passwordConfirmation &&
            $scope.user.newPassword.length >= 5){
          return true;
        }
        return false;
      };

    }
  ]);
};