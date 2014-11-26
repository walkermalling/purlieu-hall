'use strict';

module.exports = function(app){

  app.directive('newUserDirective', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/directives/newuser/new-user-template.html',
      controller: 'newUserController'
    };
  });

};