'use strict';

module.exports = function(app){

  app.directive('loginControls', function() {
    return {
      restrict: 'E',
      templateUrl: 'templates/login-template.html'
      // controller: 'userController'
    };
  });

};