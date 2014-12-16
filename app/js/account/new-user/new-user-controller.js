'use strict';

module.exports = function(app){

  app.controller('newUserController', [
    '$scope', '$http', '$cookies', '$location', 'accountServer',
    function($scope, $http, $cookies , $location, accountServer) {

      $scope.createUser = function() {
        
        accountServer.createUser({
            'email': $scope.user.newEmail,
            'password': $scope.user.newPassword
          })
          .success(function(data) {
            $cookies.jwt = data.jwt;
            $http.defaults.headers.common.jwt = data.jwt;
            $location.path('/dtosaua');
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