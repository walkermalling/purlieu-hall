'use strict';

module.exports = function(app){

  app.controller('adminController', 
    ['$cookies', '$location', '$scope', 'cmsServer', 'userServer', 'auth',
    function($cookies, $location, $scope, cmsServer, userServer, auth){

    // if authorized, set header or redirect
    auth.sendJWT(); 

    $scope.sections = {
      'cms' : true,
      'events' : false,
      'users' : false
    };

    $scope.goTo = function (selection) {
      for (var key in $scope.sections) {
        console.log(key);
        if (key === selection) $scope.sections[key] = true;
        else $scope.sections[key] = false;
      }
    };


  }]);
};