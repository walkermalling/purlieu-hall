'use strict';

var util = require('util');
var moment = require('moment');

module.exports = function(app){

  app.controller('publicCalendarController', 
    ['$scope', '$cookies', '$location','calServer',
    function($scope, $cookies, $location, calServer) {
    
    $scope.calendar = {};

    $scope.calendar.getSections = function () {
      calServer.getPublic()
        .success(function (calEvents) {
          if (!calEvents || !calEvents.feed) {
            return null;
          }
          var entries = [];
          calEvents.feed.entry.forEach(function (entry) {
            var newEntry = {
              title: entry.title[0]._
            };
            var content = entry.content[0]._.split('<br />');
            content.forEach(function (item) {
              var i = item.replace('\n','').split(':');
              var label = i.shift();
              var body = i.join(':').trim();

              if (label === 'When') {
                newEntry.start = body.replace('PDT', '').trim();
                console.log(newEntry.start);
              } else {
                newEntry[label] = body;
              }
              
            });
            entries.push(newEntry);
          });
          $scope.calendar.calEvents = entries.slice(0,2);
        });
    };

    $scope.calendar.getSections();
    
  }]);
};