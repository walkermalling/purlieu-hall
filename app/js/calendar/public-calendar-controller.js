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
              console.log(label);
              if (label === 'First start') {
                newEntry.start = body;
              } else {
                newEntry[label] = body;
              }
              
            });
            entries.push(newEntry);
            console.log(newEntry);
          });
          $scope.calendar.calEvents = entries;

        });
    };

    $scope.calendar.getSections();
    
  }]);
};