'use strict';

module.exports = function(app){

  app.controller('cmsController', ['$scope', 'cmsServer',
    function($scope, cmsServer) {

    $scope.frontpage = {};
    $scope.frontpage.newItem = {};

    // routines

    $scope.frontpage.getItems = function () {
      cmsServer.frontPageItem.getAll()
        .success(function (items) {
          $scope.frontpage.items = items;
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
      console.log('cms controller sends item update req as:');
     
      var item = $scope.frontpage.items[itemIndex];

      console.log(item);

      cmsServer.frontPageItem.update(item)
        .success(function (response) {
          console.log(response);
          $scope.frontpage.getItems();
        });
    };

    // execute

    $scope.frontpage.getItems();

    console.log( $scope.frontpage );

  }]);
};