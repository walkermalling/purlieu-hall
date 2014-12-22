'use strict';

module.exports = function(app){

  app.directive('footerBlock', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/partials/footer/footer-template.html',
      scope: {}
    };
  });

};