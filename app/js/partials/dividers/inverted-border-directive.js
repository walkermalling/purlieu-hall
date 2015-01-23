'use strict';

module.exports = function(app){

  app.directive('invertedBorder', function() {
    return {
      restrict: 'E',
      template: [
        '<div class="inverted-border left"></div>',
        '<div class="inverted-border right"></div>'
      ].join('')
    };
  });

};