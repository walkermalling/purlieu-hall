'use strict';

var util = require('util');

module.exports = function(app){

  app.controller('libraryController', 
    ['$scope', '$cookies', '$location', 'libraryServer'
    function($scope, $cookies, $location, libararyServer) {

      $scope.library = {};

      libraryServer.books.getAll()
        .success(function (results) {
          $scope.library.books = results;
        });

    // send a search query

    // get an index of collections

    // get an index of authors

    // get a randon artifact

    // request a title

    

  }]);
};