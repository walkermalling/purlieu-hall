var util = require('util');
var moment = require('moment');
var _ = require('lodash');
var async = require('async');
var request = require('request');

module.exports = function(app){

  app.controller('privateCalendarController', 
    ['$scope', '$cookies', '$location','$http',
    function($scope, $cookies, $location, $http) {
    
    var publicEvents = [];
    var privateEvents = [];

    $scope.calendars = {
      events: []
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

    var publicApi = 'https://www.google.com/calendar/feeds/leidsmes3ofpmmttid821fett0%40group.calendar.google.com/private-71b4e8a5fb8ed17992d6384490aa0b92/basic';
    var privateApi = 'https://www.google.com/calendar/feeds/9hn5l2l3s0ba2aljtd0m3ndu38%40group.calendar.google.com/private-7c4e5248830b7a12286e7fea810ddaf4/basic';
    var requests = [
      function getPublic (callback) {
        $http({url: publicApi, method: 'GET'})
          .success(function (data, status, headers, config) {
            callback(null, processCalData(data));
        });
      } ,
      function getPrivate (callback) {
        $http({url: privateApi, method: 'GET'})
          .success(function (data, status, headers, config) {
            callback(null, processCalData(data));
        });
      }
    ];

    function getCalData () {
      async.parallel(requests, function munge (arr) {
        var sorted = _.sortBy(arr[0].concat(arr[1]), 'start');
        $scope.calendars.events = sorted.slice(0, 6).reverse();
      });
    }
   

    // function weaveCalEvents () {
    //   console.log('weaving...');
    //   var a = publicEvents;
    //   var b = privateEvents;
    //   var c = a.concat(b);
    //   console.log('result:');
    //   console.log(c);
    //   var sorted = _.sortBy(c, 'start');
    //   $scope.calendars.events = sorted.slice(0, 6).reverse();
    // }

    // $scope.calendars.getSections = function () {

    //   calServer.getPublic()
    //     .success(function (calEvents) {
    //       if (!calEvents || !calEvents.feed) {
    //         console.log('error getting public events');
    //         console.log(calEvents);
    //         return;
    //       }
    //       publicEvents = processCalData(calEvents);
    //       weaveCalEvents();
    //     });

    //   calServer.getPrivate()
    //     .success(function (calEvents) {
    //       if (!calEvents || !calEvents.feed) {
    //         console.log('error getting private events');
    //         return;    
    //       }
    //       privateEvents = processCalData(calEvents);
    //       weaveCalEvents();
    //     });

    //   };

    // $scope.calendars.getSections();
    
  }]);
};