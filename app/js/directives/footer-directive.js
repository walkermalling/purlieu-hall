'use strict';

module.exports = function(app){

  app.directive('footerBlock', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'templates/footer-template.html'
    };
  });

};