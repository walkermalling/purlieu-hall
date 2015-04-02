'use strict';

module.exports = function(app){

  app.directive('library', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/library/library-template.html',
      controller: 'libraryController'
    };
  });

};