var _ = require('lodash');

module.exports = function(app){

  app.controller('frontpageCmsController', 
    ['$scope', '$cookies', '$location', 'cmsServer',
    function($scope, $cookies, $location, cmsServer) {

    $scope.frontpage = {};
    $scope.frontpage.newItem = {};
    $scope.verbose = false; 

    function updateItemSort () {
      $scope.frontpage.items = _.sortBy($scope.frontpage.items, 'position');
      console.log('(Re)sorting');
      console.log($scope.frontpage.items);
    }

    $scope.frontpage.getItems = function () {
      $scope.frontpage.newItem = {};
      cmsServer.frontPageItem.getAll()
        .success(function (items) {
          $scope.frontpage.items = items;
          console.log($scope.frontpage.items);
          updateItemSort();
          $scope.frontpage.items.forEach(function (i, index) {
            i.active = false;
          });
        });
    };

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

    function findItemById (id) {
      var requestedItem = null;
      $scope.frontpage.items.forEach(function (item) {
        if (item._id === id) {
          requestedItem = item;
        }
      });
      return requestedItem;
    }

    function findItemByPosition (position) {
      var requestedItem = null;
      $scope.frontpage.items.forEach(function (item) {
        if (item.position === position) {
          requestedItem = item;
        }
      });
      return requestedItem;
    }

    $scope.moveUp = function (id) {
      var currentItem = findItemById(id);
      if (currentItem) {
        if (parseInt(currentItem.position) === 0) {
          return;
        } else {
          var itemToSwapWith = findItemByPosition(parseInt(currentItem.position) + 1);
          if (itemToSwapWith) {
            itemToSwapWith.position = parseInt(itemToSwapWith.position) - 1;
            currentItem.position = parseInt(currentItem.position) + 1;
          }
        }
      }
      updateItemSort();
    };

    $scope.moveDown = function (id) {
      var currentItem = findItemById(id);
      if (currentItem) {
        if (parseInt(currentItem.position) >= $scope.frontpage.items.length) {
          return;
        } else {
          var itemToSwapWith = findItemByPosition(parseInt(currentItem.position) + 1);
          if (itemToSwapWith) {
            itemToSwapWith.position = parseInt(itemToSwapWith.position) + 1;
            currentItem.position = parseInt(currentItem.position) - 1;
          }
        }
      }
      updateItemSort();
    };

    // init: fetch content

    $scope.frontpage.getItems();

  }]);
};