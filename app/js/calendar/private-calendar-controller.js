'use strict';

var util = require('util');
var moment = require('moment');
// var request = require('request');
// var async = require('async');

module.exports = function(app){

  app.controller('privateCalendarController', 
    ['$scope', '$cookies', '$location','calServer',
    function($scope, $cookies, $location, calServer) {
    
    $scope.calendars = {
      'publicEvents': [],
      'privateEvents': []
    };

    // async.parallel(
    //   [
    //   ],
    //   function iterator () {

    //   }, function allFinished () {

    //   }
    // );
    
  }]);
};