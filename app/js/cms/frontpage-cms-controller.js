var _ = require('lodash');

module.exports = function(app){

  app.controller('frontpageCmsController', 
    ['$scope', '$cookies', '$location', 'cmsServer',
    function($scope, $cookies, $location, cmsServer) {

    $scope.frontpage = {};
    $scope.frontpage.newItem = {};
    $scope.verbose = false; 

    function reportItemOrder () {
      $scope.frontpage.items.forEach(function (item) {
        console.log(item.position + ' ' + item.title);
      });
    }

    function updateItemSort () {
      $scope.frontpage.items = _.sortBy($scope.frontpage.items, 'position');
      reportItemOrder();
    }

    function normalizePositions () {
      $scope.frontpage.items.forEach(function (item, index) {
        item.position = index;
      });
    }

    $scope.frontpage.getItems = function () {
      $scope.frontpage.newItem = {};
      cmsServer.frontPageItem.getAll()
        .success(function (items) {
          console.log('Original list:');
          $scope.frontpage.items = items;
          updateItemSort();
        });
    };

    $scope.frontpage.initializePage = function () {
      $scope.frontpage.newItem = {};
      cmsServer.frontPageItem.getAll()
        .success(function (items) {
          $scope.frontpage.items = items;
          console.log('Original list:');
          reportItemOrder();
          $scope.frontpage.items.forEach(function (i, index) {
            i.active = false;
          });
          normalizePositions();
        });
    };

    $scope.frontpage.create = function () {
      cmsServer.frontPageItem.create($scope.frontpage.newItem)
        .success(function (response) {
          $scope.frontpage.getItems();
        });
    };

    $scope.frontpage.update = function () {
      $scope.frontpage.items.forEach(function (item) {
        cmsServer.frontPageItem.update(item)
          .success(function (response) {
            $scope.frontpage.getItems();
          });
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
      console.log('Moving up...');
      console.log(currentItem);
      if (currentItem) {
        if (currentItem.position === 0) {
          console.log('Item already a the top');
          return;
        } else {
          var itemToSwapWith = findItemByPosition(currentItem.position - 1);
          if (itemToSwapWith) {
            itemToSwapWith.position = itemToSwapWith.position + 1;
            currentItem.position = currentItem.position - 1;
            console.log(itemToSwapWith.title + ' is now ' + itemToSwapWith.position);
            console.log(currentItem.title + ' is now ' + currentItem.position);
          }
        }
      }
      updateItemSort();
    };

    $scope.moveDown = function (id) {
      var currentItem = findItemById(id);
      console.log('Moving down...');
      if (currentItem) {
        if (currentItem.position >= $scope.frontpage.items.length) {
          console.log('Item already a the bottom');
          return;
        } else {
          var itemToSwapWith = findItemByPosition(currentItem.position + 1);
          if (itemToSwapWith) {
            itemToSwapWith.position = itemToSwapWith.position - 1;
            currentItem.position = currentItem.position + 1;
            console.log(itemToSwapWith.title + ' is now ' + itemToSwapWith.position);
            console.log(currentItem.title + ' is now ' + currentItem.position);
          }
        }
      }
      updateItemSort();
    };

    // init: fetch content

    $scope.frontpage.initializePage();

  }]);
};