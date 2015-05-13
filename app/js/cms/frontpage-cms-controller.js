'use strict';

module.exports = function(app){

  app.controller('frontpageCmsController', 
    ['$scope', '$cookies', '$location', 'cmsServer',
    function($scope, $cookies, $location, cmsServer) {

    /**
     * Initialize variables on the scope
     */
    
    $scope.frontpage = {};
    $scope.frontpage.newItem = {};
    // 'verbose' controls display of instructions
    $scope.verbose = false; 

    /**
     * Frontpage CRUD
     */

    $scope.frontpage.getItems = function () {
      $scope.frontpage.newItem = {};
      cmsServer.frontPageItem.getAll()
        .success(function (items) {
          console.log(items);
          $scope.frontpage.items = items;
          $scope.frontpage.items.forEach( function (i) {
            i.active = false;           // set visibility to false
          });
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
    
    $scope.select = function (itemTitle) {
      var items = $scope.frontpage.items;
      items.forEach(function (i) {
        if (i.title === itemTitle) i.active = true;
        else i.active = false;
      });
    };

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

    // init: fetch content

    $scope.frontpage.getItems();

  }]);
};