'use strict';

module.exports = function(app){

  app.controller('dtosauaCmsController', 
    ['$scope', '$cookies', '$location', 'cmsServer',
    function($scope, $cookies, $location, cmsServer) {

    /**
     * Initialize variables on the scope
     */
    
    $scope.dtosaua = {};
    $scope.dtosaua.newSection = {};

    /**
     * dtosaua CRUD
     */

    $scope.dtosaua.getSections = function () {
      $scope.dtosaua.newSection = {};
      cmsServer.dtosauaSection.getAll()
        .success(function (sections) {
          // save items to the scope 
          $scope.dtosaua.sections = sections;
          // prepare sections for ui logic
          prep();
        });
    };

    $scope.dtosaua.create = function () {
      cmsServer.dtosauaSection.create($scope.dtosaua.newSection)
        .success(function (response) {
          console.log(response);
          $scope.dtosaua.getSections();
        });
    };

    $scope.dtosaua.update = function (sectionIndex) {
      var section = $scope.dtosaua.sections[sectionIndex];
      cmsServer.dtosauaSection.update(section)
        .success(function (response) {
          console.log(response);
          $scope.dtosaua.getSections();
        });
    };

    /**
     * UI Utilities
     */

    $scope.addItemTo = function (sectionIndex) {
      var section = $scope.dtosaua.sections[sectionIndex];
      section.items.push({
        'subtitle': 'new section item',
        'content': 'placeholder content',
        'position': section.items.length,
        'enable': false
      });
    };

    /**
     * prepare sections:
     * - add 'active' property to assist in ui logic
     * - set position property of new item
     */
    function prep () {
      // set visibility on each section and subitem
      $scope.dtosaua.sections.forEach(function (sec, secIndex) {
        if (secIndex === 0) sec.active = true;
        else sec.active = false;
        sec.items.forEach(function (item, itemIndex) {
          if (itemIndex === 0) item.active = true;
          else item.active = false;
        });
      });

      // set the position of a possible new section
      $scope.dtosaua.newSection.position = $scope.dtosaua.sections.length;
    }

    $scope.moveLeft = function (sectionIndex) {
      // ensure there is room to the left
      if (sectionIndex <= 0 ) return;
      // swape current with left neighbor
      $scope.dtosaua.sections[sectionIndex].position--;
      $scope.dtosaua.sections[sectionIndex - 1].position++;
    };

    $scope.moveRight = function (sectionIndex) {
      // ensure there is room to the right
      if (sectionIndex >= $scope.dtosaua.sections.length - 1) return;
      // swap current with right neighbor
      $scope.dtosaua.sections[sectionIndex].position++;
      $scope.dtosaua.sections[sectionIndex + 1].position--;
    };

    /**
     * Given a number reperesting the index of a zero-indexed array
     * return a string representing its enumeration
     */
    $scope.enumerate = function (num) {
      if (num === 0) return '1st';
      if (num === 1) return '2nd';
      if (num === 2) return '3rd';
      if (num > 2 && num < 21) return '' + (num + 1) + 'th';
    };

    // init: fetch content

    $scope.dtosaua.getSections();
    
    console.log($scope.dtosaua.sections);

  }]);
};