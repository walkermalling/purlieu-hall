'use strict';

var util = require('util');

module.exports = function(app){

  app.controller('publicCalendarController', 
    ['$scope', '$cookies', '$location', 'calServer',
    function($scope, $cookies, $location, calServer) {
    
    $scope.calendar = {
      calEvents: [
        {
          name: 'myevent',
          location: 'some location',
          time: 'start time'
        },
        {
          name: 'yourEvent',
          location: 'some location',
          time: 'start time'
        }
      ]
    };

    console.log($scope.calendar);

    /**
     * calendar 
     */

    // $scope.calendar.getSections = function () {
    //   calServer.getAll()
    //     .success(function (calEvents) {
    //       $scope.calendar.calEvents = calEvents;
    //     });
    // };

  }]);
};