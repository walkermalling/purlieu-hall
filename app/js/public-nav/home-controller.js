'use strict';

module.exports = function(app){

  app.controller('homeController', ['$scope', 'contentServer',
    function($scope, contentServer) {

      var $ = require('jquery');

      $scope.frontpage = {};
      $scope.frontpage.items = {};
      $scope.user = {
        create: false,
        swap: function(){
          $scope.user.create = !$scope.user.create;
        }
      };

      // API

      $scope.frontpage.getItems = function () {
        contentServer.frontPageItem.getAll()
          .success(function (items) {
            $scope.frontpage.items = items;
            console.log(items);
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

      // Animation
      
      $scope.$on('ngRepeatFinished', function (event) { /*jshint ignore:line*/

        var menuLinks = $('nav .menu-item > a');
        var menuItems = $('nav .menu-item');

        console.log(menuItems);

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
      });

      // Init Execute
      
      $scope.frontpage.getItems();

    }

  ]);
};