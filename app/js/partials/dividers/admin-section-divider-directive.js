'use strict';

module.exports = function(app){

  app.directive('sectionDivider', function() {
    return {
      restrict: 'E',
      template: ['<div class="divider">',
        '<div id="first-top-border-green"></div>',
        '<div id="second-top-border-green"></div>',
        '<div class="inverted-border left"></div>',
        '<div class="inverted-border right"></div>',
      '</div>'].join('')
    };
  });

};