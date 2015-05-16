'use strict';

var util = require('util');
var moment = require('moment');
var _ = require('lodash');

module.exports = function(app){

  app.controller('privateCalendarController', 
    ['$scope', '$cookies', '$location','calServer',
    function($scope, $cookies, $location, calServer) {
    
    $scope.calendars = {
      'publicEvents': [],
      'privateEvents': []
    };

    function processCalData (calData) {
      var entries = [];
      calData.feed.entry.forEach(function (entry) {
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
          } else {
            newEntry[label] = body;
          }
          
        });
        entries.push(newEntry);
      });
      return entries;
    }

    function weaveCalEvents () {
      console.log('weaving...');
      console.log($scope.calendars);
      var a = $scope.calendars.publicEvents;
      var b = $scope.calendars.privateEvents;
      var c = a.concat(b);
      var sorted = _.sortBy(c, 'start');
      $scope.calendars.events = sorted.slice(0, 6).reverse();
    }

    $scope.calendars.getSections = function () {

      calServer.getPrivate()
        .success(function (calEvents) {
          if (!calEvents || !calEvents.feed) {
            console.log('error getting private events');
            return null;
          }
          var entries = processCalData(calEvents);
          $scope.calendars.privateEvents = entries;
          weaveCalEvents();
        });

      calServer.getPublic()
        .success(function (calEvents) {
          if (!calEvents || !calEvents.feed) {
            console.log('error getting public events');
            return null;
          }
          var entries = processCalData(calEvents);
          $scope.calendars.publicEvents = entries;
          weaveCalEvents();
        });
      };

    $scope.calendars.getSections();
    
  }]);
};