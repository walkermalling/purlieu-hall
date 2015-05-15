'use strict';

module.exports = function(app){

  app.directive('privateCalendar', function() {
    return {
      restrict: 'EA',
      templateUrl: 'js/calendar/private-calendar-template.html',
      controller: 'privateCalendarController'
    };
  });

};