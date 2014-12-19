'use strict';

module.exports = function (app) {

  app.directive('userManagement', function () {
    return {
      restrict: 'EA',
      templateUrl: 'js/account/user-management/user-management-template.html',
      controller: 'userManagementController',
      scope : {}
    };
  });

};