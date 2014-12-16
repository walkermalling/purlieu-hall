'use strict';

module.exports = function(app){

  app.directive('footerBlock', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/partials/footer/footer-template.html'
    };
  });

};