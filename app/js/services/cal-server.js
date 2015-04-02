var util = require('util');

module.exports = function (app) {
  app.factory('calServer', function ($http) {

    var calServer = {};

    var calRoute = '/api/public/events';

    calServer.getAll = function () {
      return $http.get(calRoute)
        .error(logError);
    };

    calServer.getOne = function (id) {
      return $http.get(calRoute + '/' + id)
        .error(logError);
    };

    // calServer.create = function (calEvent) {
    //   return $http.post(calRoute, user)
    //     .error(logError);
    // };

    // calServer.update = function (calEvent) {
    //   console.log('cal server service updating ...');
    //   console.log(calEvent);
    //   return $http.put(calRoute + '/' + calEvent._id, calEvent)
    //     .error(logError);
    // };

    // calServer.destroy = function (id) {
    //   return $http.delete(calRoute + '/' + id)
    //     .error(logError);
    // };

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