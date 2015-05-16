'use strict';

var util = require('util');
var moment = require('moment');
var _ = require('lodash');

module.exports = function(app){

  app.controller('privateCalendarController', 
    ['$scope', '$cookies', '$location','calServer',
    function($scope, $cookies, $location, calServer) {
    
    var publicEvents = [];
    var privateEvents = [];

    $scope.calendars = {
      events: []
    };

    function processCalData (calData) {
      console.log('processing incoming data:');
      console.log(calData);
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
      var a = publicEvents;
      var b = privateEvents;
      var c = a.concat(b);
      console.log('result:');
      console.log(c);
      var sorted = _.sortBy(c, 'start');
      $scope.calendars.events = sorted.slice(0, 6).reverse();
    }

    $scope.calendars.getSections = function () {

      calServer.getPublic()
        .success(function (calEvents) {
          if (!calEvents || !calEvents.feed) {
            console.log('error getting public events');
            console.log(calEvents);
            return;
          }
          publicEvents = processCalData(calEvents);
          weaveCalEvents();
        });

      calServer.getPrivate()
        .success(function (calEvents) {
          if (!calEvents || !calEvents.feed) {
            console.log('error getting private events');
            return;
          }
          privateEvents = processCalData(calEvents);
          weaveCalEvents();
        });

      };

    $scope.calendars.getSections();
    
  }]);
};