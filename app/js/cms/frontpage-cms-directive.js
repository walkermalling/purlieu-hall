'use strict';

module.exports = function(app){

  app.directive('frontpageCms', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/cms/frontpage-cms-template.html',
      controller: 'frontpageCmsController',
      scope: {}
    };
  });

};