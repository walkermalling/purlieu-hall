'use strict';

module.exports = function(app){

  app.directive('newUserDirective', function() {
    return {
      restrict: 'EAC',
      templateUrl: 'js/account/new-user/new-user-template.html',
      controller: 'newUserController'
    };
  });

};