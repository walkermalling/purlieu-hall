'use strict';

module.exports = function(app){

  app.directive('loginDirective', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/directives/login/login-template.html',
      controller: 'loginController'
    };
  });

};