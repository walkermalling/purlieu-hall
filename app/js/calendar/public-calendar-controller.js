'use strict';

var util = require('util');

module.exports = function(app){

  app.controller('publicCalendarController', 
    ['$scope', '$cookies', '$location','calServer',
    function($scope, $cookies, $location, calServer) {
    
    $scope.calendar = {};

    /**
     * calendar 
     */

    $scope.calendar.getSections = function () {
      calServer.getAll()
        .success(function (calEvents) {
          $scope.calendar.calEvents = calEvents;
          console.log(util.format('Events: %s',calEvents));
        });
    };

    $scope.calendar.getSections();
    
  }]);
};