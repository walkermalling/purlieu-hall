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
    
    function parseShittyDate (dateString) {
      var dStr = dateString.trim();
      var date = dateString.slice(0,10);
      var time = dateString.slice(11,19).split(',').map(function (item) {
        return parseInt(item);
      });
      var d = new Date(date);
      d.setHours(time[0] + (d.getTimezoneOffset() / 6), time[1]);
      return d;
    }

    $scope.calendar.getSections = function () {
      calServer.getAllPublic()
        .success(function (calEvents) {
          var entries = [];
          calEvents.feed.entry.forEach(function (entry) {
            var newEntry = {
              title: entry.title[0]._
            };
            var content = entry.content[0]._.split('<br />');
            content.forEach(function (item) {
              var i = item.replace('\n','').split(':');
              var label = i.shift();
              var body = i.join().trim();

              if (label === 'First start') {
                var startDate = parseShittyDate(body);
                newEntry.start = startDate;
              } else {
                newEntry[label] = body;
              }
              
            });
            entries.push(newEntry);
          });
          $scope.calendar.calEvents = entries;

        });
    };

    $scope.calendar.getSections();
    
  }]);
};