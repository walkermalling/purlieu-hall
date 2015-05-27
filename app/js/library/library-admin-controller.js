var util = require('util');

module.exports = function(app){

  app.controller('libraryAdminController', 
    ['$scope', '$cookies', '$location', 'libraryServer', 'auth',
    function($scope, $cookies, $location, libraryServer, auth) {

      // auth.sendJWT(); 

      $scope.library = {};
      $scope.library.books = [];

      function getAllBooks () {
        console.log('Attempting to fetch books collection');
        libraryServer.books.getAll()
          .success(function (results) {
            console.log('Library.books.getAll:');
            console.log(results);
            $scope.library.books = results;
          });
      }

      $scope.library.books.create = function (book) {
        var required = ['title', 'author'];
        var attributes = Object.keys(book);
        var invalidPostRequest = require.some(function (requirement) {
          if (attributes.indexOf(requirement) === -1) return true;
          else return false;
        });

        if (invalidPostRequest) {
          console.log('Invalid post request');
          return;
        }

        libraryServer.books.create(book)
          .success(function (result) {
            console.log(result);
            getAllBooks();
          });
      };

      // init
      
      getAllBooks();

  }]);
};