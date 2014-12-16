'use strict';

module.exports = function(app){

  app.controller('homeController', ['$scope', function($scope) {

    $scope.user = {
      create: false,
      swap: function(){
        $scope.user.create = !$scope.user.create;
      }
    };

    var $ = require('jquery');
    var menuLinks = $('nav .menu-item > a');
    var menuItems = $('nav .menu-item');

    menuLinks.on('click', function(){

      var $this = $(this);

      if ($this.parents('.menu-item').hasClass('active')){
        $this.parents('.menu-item')
          .removeClass('active');
        menuItems
          .removeClass('supress');
      } else if ( $this.parents('.menu-item').hasClass('supress')){
        // do nothing
      } else {
        menuItems
          .removeClass('active')
            .not($this.parents('.menu-item'))
            .addClass('supress');
        $this.parents('.menu-item')
          .addClass('active');
      }

    });

  }]);
};