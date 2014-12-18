'use strict';

module.exports = function(app){

  app.controller('cmsController', ['$scope', 'cmsServer',
    function($scope, cmsServer) {

    $scope.frontpage = {};
    $scope.frontpage.newItem = {};
    $scope.freezePage = false;

    // routines

    // CRUD

    $scope.frontpage.getItems = function () {
      $scope.freezePage = true;
      $scope.frontpage.newItem = {};
      cmsServer.frontPageItem.getAll()
        .success(function (items) {
          $scope.frontpage.items = items;
          $scope.freezePage = false;
        });
    };

    $scope.frontpage.create = function () {
      $scope.freezePage = true;
      cmsServer.frontPageItem.create($scope.frontpage.newItem)
        .success(function (response) {
          console.log(response);
          $scope.frontpage.getItems();
        });
    };

    $scope.frontpage.update = function (itemIndex) {
      $scope.freezePage = true;   
      var item = $scope.frontpage.items[itemIndex];
      cmsServer.frontPageItem.update(item)
        .success(function (response) {
          console.log(response);
          $scope.frontpage.getItems();
        });
    };

    $scope.frontpage.delete = function (itemIndex) {   
      $scope.freezePage = true;
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