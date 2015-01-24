'use strict';

module.exports = function(app){

  app.directive('dtosauaCms', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/cms/dtosaua-cms-template.html',
      controller: 'dtosauaCmsController',
      scope: {}
    };
  });

};