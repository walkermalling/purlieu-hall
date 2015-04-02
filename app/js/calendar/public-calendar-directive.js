'use strict';

module.exports = function(app){

  app.directive('publicCalendar', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/calendar/public-calendar-template.html',
      controller: 'publicCalendarController'
    };
  });

};