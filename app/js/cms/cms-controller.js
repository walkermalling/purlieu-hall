'use strict';

module.exports = function(app){

  app.controller('cmsController', 
    ['$scope', '$cookies', '$location', 'cmsServer',
    function($scope, $cookies, $location, cmsServer) {

    console.log('loading cms controller');

    $scope.frontpage = {};
    $scope.frontpage.newItem = {};

    // routines

    // CRUD

    $scope.frontpage.getItems = function () {
      $scope.frontpage.newItem = {};
      cmsServer.frontPageItem.getAll()
        .success(function (items) {
          $scope.frontpage.items = items;
          console.log(items);
        });
    };

    $scope.frontpage.create = function () {
      cmsServer.frontPageItem.create($scope.frontpage.newItem)
        .success(function (response) {
          console.log(response);
          $scope.frontpage.getItems();
        });
    };

    $scope.frontpage.update = function (itemIndex) {
      var item = $scope.frontpage.items[itemIndex];
      cmsServer.frontPageItem.update(item)
        .success(function (response) {
          console.log(response);
          $scope.frontpage.getItems();
        });
    };

    $scope.frontpage.delete = function (itemIndex) {   
      var item = $scope.frontpage.items[itemIndex];
      cmsServer.frontPageItem.destroy(item)
        .success(function (response) {
          console.log(response);
          $scope.frontpage.getItems();
        });
    };

    // Helpers
    
    $scope.mapNumeral = function (numeral) {
      var map = {
        0 : 'primary',
        1 : 'secondary',
        2 : 'tertiary',
        3 : 'quaternary',
        5 : 'quinary'
      };
      return map[numeral] || numeral;
    };

    // init: execute

    $scope.frontpage.getItems();


  }]);
};