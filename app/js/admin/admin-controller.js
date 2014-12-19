'use strict';

module.exports = function(app){

  app.controller('adminController', 
    ['$cookies', '$location', '$scope', 'cmsServer', 'userServer', 'auth',
    function($cookies, $location, $scope, cmsServer, userServer, auth){

    // if authorized, set header or redirect
    auth.sendJWT(); 


  }]);
};