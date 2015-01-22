'use strict';

module.exports = function(app){

  app.controller('dtosauaController', 
    ['$cookies', '$location', '$scope', 'auth', 'contentServer',
    function($cookies, $location, $scope, auth, contentServer){

    // if authorized, set header or redirect
    auth.sendJWT(); 

    $scope.dtosaua = {}; // initalize content namespace

    var dtosaua = $scope.dtosaua;

    function getPageContent () {
      dtosaua.sections = false;
      dtosaua.items = false;

      contentServer.dtosauaSection.getAll()
        .success(function (sections) {
          console.log(sections);
          dtosaua.sections = sections;
          initializeNavigation();
        });

      contentServer.dtosauaItem.getAll()
        .success(function (items) {
          console.log(items);
          dtosaua.items = items;
          initializeNavigation();
        });

    }

    function initializeNavigation () {
      if (dtosaua.sections && dtosaua.items) {
        console.log('both are sections and items are fetched');
      } else {
        console.log('content not yet loaded');
      }
    }

    // init
    
    getPageContent();


  }]);
};