var util = require('util');

module.exports = function(app) {
  app.factory('libraryServer', function($http) {

    var libraryServer = {};

    var libBaseRoute = '/api/public/library/';
    libraryServer.books = {};

    libraryServer.books.getAll = function () {
      return $http.get(libBaseRoute + 'books')
        .error(logError);
    };

    function logError (data, status) {
      console.warn(util.format('Error in Content Server Operation:\nData: %s\nStatus: %s', data, status));
    }

    return libraryServer;

  });
};