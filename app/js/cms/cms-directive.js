'use strict';

module.exports = function(app){

  app.directive('contentManagement', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/cms/cms-template.html',
      controller: 'cmsController'
    };
  });

};