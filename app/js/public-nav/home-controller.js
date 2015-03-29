'use strict';

module.exports = function(app){

  app.controller('homeController', ['$scope', 'contentServer',
    function($scope, contentServer) {

      var $ = require('jquery');

      $scope.frontpage = {};
      $scope.frontpage.items = {};
      // $scope.user = {
      //   create: false,
      //   swap: function(){
      //     // this can be depricated when invitations are implemented
      //     $scope.user.create = !$scope.user.create;
      //   }
      // };

      // API

      $scope.frontpage.getItems = function () {
        contentServer.frontPageItem.getAll()
          .success(function (items) {
            // if no items are loaded, initialize
            if (items.length === 0) {
              console.log('no fontpage items, invoking init');
              navigationInit();
            }
            // save fetched items to scope
            $scope.frontpage.items = items;
          });
      };


      // Helper Routines
      
      
      /**
       *  Quick Map for indecies to named ranks
       */
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


      /**
       *  Configure sliding navigation behavior
       */

      function navigationInit () {

        $scope.menuLinks = $('nav .menu-item > a');
        $scope.menuItems = $('nav .menu-item');

        $scope.menuLinks.on('click', function(){

          var $this = $(this);

          // Link is already Active
          if ($this.parents('.menu-item').hasClass('active')){
            $this.parents('.menu-item')
              .removeClass('active');
            $scope.menuItems
              .removeClass('supress');

          // link is Supressed, prevent action
          } else if ( $this.parents('.menu-item').hasClass('supress')){
            // do nothing
          
          // Link is inactive, Activate
          } else {
            $scope.menuItems
              .removeClass('active')
                .not($this.parents('.menu-item'))
                .addClass('supress');
            $this.parents('.menu-item')
              .addClass('active');
          }

        });
      }

      /**
       *  Call navigation config once items are loaded
       */


      
      $scope.$on('ngRepeatFinished', function (event) { /*jshint ignore:line*/
        console.log(new Date());
        console.log(event);
        navigationInit();
      });

      /**
       * Initialize the Page
       */
      
      $scope.frontpage.getItems();

    }

  ]);
};