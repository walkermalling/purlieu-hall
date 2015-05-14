var util = require('util');

module.exports = function (app) {
  app.factory('calServer', function ($http) {

    var calServer = {};

    var calRoute = '/api/public/events';
    var privateCalRoute = '/api/admin/calendar';

    calServer.getPublic = function () {
      return $http.get(calRoute)
        .error(logError);
    };

    calServer.getPrivate = function () {
      return $http.get(privateCalRoute)
        .error(logError);
    };

    function logError (data, status) {
      console.warn(util.format(
        'Error in Calendar Server Operation:\nData: %s\nStatus: %s',
        data,
        status
      ));
    }
    
    return calServer;

  });
};