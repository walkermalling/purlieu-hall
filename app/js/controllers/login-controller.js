'use strict';

module.exports = function(app){

  app.controller('loginController', [
    '$scope', '$http', '$base64', '$cookies', '$location',
    function($scope, $http, $base64, $cookies , $location) {

      if ($location.path() === '/signout') {
        console.log('signout requested, nullifying cookie...');
        $cookies.jwt = null;
        return $location.path('/');
      }
      
      $scope.signin = function() {

        var credentials = 'Basic ' + 
          $base64.encode(
            $scope.user.email + ':' + 
            $scope.user.password
        );

        $http.defaults.headers.common.Authorization = credentials;

        $http.get('/api/login')
          .success(function(data) {
            $cookies.jwt = data.jwt;
            $location.path('/dtosaua');
          })
          .error(function(data) {
            console.log('error logging in user');
            console.log(data);
          });
      }; 


    }
  ]);
};



