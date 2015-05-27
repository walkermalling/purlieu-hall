var util = require('util');

module.exports = function(app) {
  app.factory('libraryServer', function($http) {

    var libraryServer = {};

    var libBasePublicRoute = '/api/public/library';
    var libBaseAdminRoute = '/api/admin/library';

    // books
    libraryServer.books = {};

    libraryServer.books.getAll = function () {
      console.log('Library server, getting all books');
      return $http.get(libBasePublicRoute + '/books')
        .error(logError);
    };

    libraryServer.books.create = function (newBook) {
      return $http.post(libBaseAdminRoute + '/books', newBook)
        .error(logError);
    };

    libraryServer.books.update = function (newBook) {
      return $http.put(libBaseAdminRoute + '/books/' + newBook._id, newBook)
        .error(logError);
    };

    libraryServer.books.destroy = function (newBook) {
      return $http.delete(libBaseAdminRoute + '/books/' + newBook._id)
        .error(logError);
    };

    // stats
    libraryServer.stats = {};
    libraryServer.stats.get = function () {
      return $http.delete(libBasePublicRoute + '/stats')
        .error(logError);
    };


    // helpers
    function logError (data, status) {
      console.warn(util.format('Error in Content Server Operation:\nData: %s\nStatus: %s', util.inspect(data), status));
    }

    return libraryServer;

  });
};