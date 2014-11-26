'use strict';

module.exports = function(app){

  app.directive('footerBlock', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/directives/footer/footer-template.html'
    };
  });

};