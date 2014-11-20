'use strict';

var $ = require('jquery');

module.exports = function(app){
  app.controller('homeController', ['$scope', function($scope){

    console.log('heloo');

    var menuItems = $('nav .menu-item > a');

    menuItems.on('click', function(){
      $scope.hello();
      $(this).parents('.menu-item').toggleClass('active');
    });

    $scope.hello = function(){
      console.log('trigger');
    };

  }]);

};