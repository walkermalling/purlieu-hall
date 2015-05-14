var _ = require('lodash');

module.exports = function(app){
  
  app.controller('homeController', ['$scope', 'contentServer',
    function($scope, contentServer) {

      var $ = require('jquery');
      $scope.frontpage = {};
      $scope.frontpage.items = [];

      $scope.frontpage.getItems = function () {
        contentServer.frontPageItem.getAll()
          .success(function (items) {
            if (items.length === 0) {
              navigationInit();
            }
            $scope.frontpage.items = _.sortBy(items, 'position');
          });
      };

      // Check string against custom directive names
       
      $scope.isCustomDirective = function (sectionName) {
        var cds = ['calendar','public-calendar','library','demo-library'];
        var itemName = sectionName.toLowerCase().replace(' ', '-');
        if (cds.indexOf(itemName) > -1) {
          return true;
        } else {
          return false;
        }
      };

      // Normalize String For Comparison

      $scope.matchKey = function (key, str) {
        var normalizedKey = key.toLowerCase().replace(' ','-');
        if (normalizedKey === str) {
          return true;
        } else {
          return false;
        }
      };
      
      // Quick Map for indecies to named ranks
       
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

      // Configure sliding navigation behavior
       
      function navigationInit () {
        $scope.menuLinks = $('nav .menu-item > a');
        $scope.menuItems = $('nav .menu-item');
        $scope.menuLinks.on('click', function () {
          var $this = $(this);
          if ($this.parents('.menu-item').hasClass('active')){
            $this.parents('.menu-item')
              .removeClass('active');
            $scope.menuItems
              .removeClass('supress');
          // link is Supressed, prevent action
          } else if ( $this.parents('.menu-item').hasClass('supress')){
            // do nothing
          } else { // Link is inactive, Activate
            $scope.menuItems
              .removeClass('active')
                .not($this.parents('.menu-item'))
                .addClass('supress');
            $this.parents('.menu-item')
              .addClass('active');
          }

        });
      }

      // Call navigation config once items are loaded

      $scope.$on('ngRepeatFinished', function (event) { /*jshint ignore:line*/
        navigationInit();
      });

      // Initialize the page
      
      $scope.frontpage.getItems();

    }

  ]);
};