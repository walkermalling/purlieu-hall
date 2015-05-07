'use strict';

module.exports = function(app){

  app.controller('adminController', 
    ['$cookies', '$location', '$scope', 'cmsServer', 'userServer', 'auth',
    function($cookies, $location, $scope, cmsServer, userServer, auth){

    // if authorized, set header or redirect
    auth.sendJWT(); 

    // map sections and subitems
    $scope.sections = {
      'content': {'active': true},
      'events': {'active': false},
      'users': {'active': false},
      'library': {'active':false}
    };

    $scope.sections.content.subitems = {
      'frontpage' : {'active': true},
      'dtosaua' : {'active': false},
    };

    $scope.sections.events.subitems = {
      'list' : {'active': true},
    };

    $scope.sections.users.subitems = {
      'rolls' : {'active': true},
      'invite' : {'active': false},
    };

    $scope.sections.library.subitems = {
      'catalogue': {active: true},
      'requests': {active: false}
    };

    $scope.goTo = function (parent, child) {
      for (var key in $scope.sections) {
        if (key === parent) {
          $scope.sections[key].active = true;

          if (child) {
            for (var item in $scope.sections[key].subitems) {
              if (item === child) $scope.sections[key].subitems[item].active = true;
              else $scope.sections[key].subitems[item].active = false;
            }
          }
          
        } else {
          $scope.sections[key].active = false;
        }
      }
    };


  }]);
};