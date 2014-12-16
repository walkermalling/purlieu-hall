'use strict';

module.exports = function(app){

  app.controller('signinController', [
    '$scope', '$http', '$base64', '$cookies', '$location', 'accountServer',
    function($scope, $http, $base64, $cookies , $location, accountServer) {

      if ($location.path() === '/signout') accountServer.signout();
      
      $scope.signin = function() {

        var credentials = 'Basic ' + 
          $base64.encode(
            $scope.user.email + ':' + 
            $scope.user.password
          );

        $http.defaults.headers.common.Authorization = credentials;

        accountServer.signin()
          .success(function(data) {
            $cookies.jwt = data.jwt;
            $location.path('/dtosaua');
          });
      }; 


    }
  ]);
};



