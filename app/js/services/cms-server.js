'use strict';

module.exports = function(app) {
  app.factory('cmsServer', function($http) {

    var cmsServer = {};
    cmsServer.frontPageItem = {};

    function logError (data, status) {
      console.log('Error in CMS Server Operation:');
      console.log(data);
      console.log(status);
    }

    // Frontpage Item CRUD

    cmsServer.frontPageItem.create = function (item) {
      return $http.post('/api/frontpage', item)
        .error(logError);
    };

    cmsServer.frontPageItem.get = function (id) {
      return $http.get('/api/frontpage/' + id)
        .error(logError);
    };

    cmsServer.frontPageItem.getAll = function () {
      return $http.get('/api/frontpage')
        .error(logError);
    };

    cmsServer.frontPageItem.update = function (item) {
      console.log('cmsServer has item put request as: ');
      console.log(item);
      return $http.put('/api/frontpage/' + item._id, item)
        .error(logError);
    };

    cmsServer.frontPageItem.destroy = function (item) {
      return $http.delete('/api/frontpage/' + item._id)
        .error(logError);
    };

    return cmsServer;

  });
};