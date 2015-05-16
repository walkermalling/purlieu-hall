'use strict';

module.exports = function(app){

  app.controller('dtosauaController', 
    ['$cookies', '$location', '$scope', 'auth', 'contentServer',
    function($cookies, $location, $scope, auth, contentServer){

    // if authorized, set header or redirect
    auth.sendJWT(); 

    $scope.dtosauaContent = {}; // initalize content namespace
    var dsecs;

    function getPageContent () {
      contentServer.dtosauaSections.getAll()
        .success(function (sections) {
          $scope.dtosauaContent.sections = sections;
          dsecs = $scope.dtosauaContent.sections;
          prep();
        });
    }

    /**
     * With one or two arguments, will handle status of primary and secondary
     * navigation layers
     */
    $scope.goTo = function (parent, child) {

      dsecs.forEach(function (section) {
        if (section.title === parent) andTryChildof(section);
        else section.active = false;
      });

      function andTryChildof (section) {
        section.active = true;
        section.items.forEach(function (item) {
          if (!!child && item.subtitle === child) item.active = true;
          else if (!!child) item.active = false;
        }); 
      }
    };

    /**
     * prepare sections:
     * - add 'active' property to assist in ui logic
     * - set position property of new item
     */
    function prep () {
      // set visibility on each section and subitem
      dsecs.forEach(function (sec, secIndex) {
        if (secIndex === 0) sec.active = true;
        else sec.active = false;
        sec.items.forEach(function (item, itemIndex) {
          if (itemIndex === 0) item.active = true;
          else item.active = false;
        });
      });
    }
    
    /**
     *  Normalize String For Comparison
     */

    $scope.matchKey = function (key, str) {
      var normalizedKey = key.toLowerCase().replace(' ','-');
      if (normalizedKey === str) {
        return true;
      } else {
        return false;
      }
    };

    /**
     *  Check string against custom directive names
     */

    $scope.isCustomDirective = function (sectionName) {
      var acceptedCustomDirectives = ['catalogue','paypal','calendar'];
      var itemName = sectionName.toLowerCase().replace(' ', '-');
      if (acceptedCustomDirectives.indexOf(itemName) > -1) {
        return true;
      } else {
        return false;
      }
    };

    // init
    
    getPageContent();

  }]);
};