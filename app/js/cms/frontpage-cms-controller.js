var _ = require('lodash');

module.exports = function(app){

  app.controller('frontpageCmsController', 
    ['$scope', '$cookies', '$location', 'cmsServer',
    function($scope, $cookies, $location, cmsServer) {

    $scope.frontpage = {};
    $scope.frontpage.newItem = {};
    $scope.verbose = false; 

    $scope.frontpage.getItems = function () {
      $scope.frontpage.newItem = {};
      cmsServer.frontPageItem.getAll()
        .success(function (items) {
          $scope.frontpage.items = _.sortBy(items, 'position');
          console.log($scope.frontpage.items);
          $scope.frontpage.items.forEach(function (i, index) {
            i.active = false;
            i.position = index;
          });
        });
    };

    function updateItemSort () {
      
    }

    $scope.frontpage.create = function () {
      cmsServer.frontPageItem.create($scope.frontpage.newItem)
        .success(function (response) {
          $scope.frontpage.getItems();
        });
    };

    $scope.frontpage.update = function (itemIndex) {
      var item = $scope.frontpage.items[itemIndex];
      cmsServer.frontPageItem.update(item)
        .success(function (response) {
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

    $scope.moveUp = function (itemIndex) {
      if (itemIndex === 0) {
        return false;
      }
      $scope.frontpage.items[itemIndex - 1].position++;
      $scope.frontpage.items[itemIndex].position--;
    };

    $scope.moveDown = function (itemIndex) {
      if (itemIndex === $scope.frontpage.items.length - 1) {
        return false;
      }
      $scope.frontpage.items[itemIndex + 1].position--;
      $scope.frontpage.items[itemIndex].position++;
    };

    // init: fetch content

    $scope.frontpage.getItems();

  }]);
};