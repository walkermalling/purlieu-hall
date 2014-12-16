'use strict';

module.exports = function(app){

  app.directive('signinDirective', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/account/signin/signin-template.html',
      controller: 'signinController'
    };
  });

};