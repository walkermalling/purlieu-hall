'use strict';

module.exports = function(app) {
  app.factory('cmsServer', function($http) {

    var cmsServer = {};

    /**
     *  FrontPage CMS
     */
    
    var frontPageRoute = '/api/cms/frontpage';
    cmsServer.frontPageItem = {};

    function logError (data, status) {
      console.log('Error in CMS Server Operation:');
      console.log(data);
      console.log(status);
    }

    /**
     *  Frontpage Item CRUD
     */

    cmsServer.frontPageItem.create = function (item) {
      return $http.post(frontPageRoute, item)
        .error(logError);
    };

    cmsServer.frontPageItem.getOne = function (id) {
      return $http.get(frontPageRoute + '/' + id)
        .error(logError);
    };

    cmsServer.frontPageItem.getAll = function () {
      return $http.get(frontPageRoute)
        .error(logError);
    };

    cmsServer.frontPageItem.update = function (item) {
      return $http.put(frontPageRoute + '/' + item._id, item)
        .error(logError);
    };

    cmsServer.frontPageItem.destroy = function (item) {
      return $http.delete(frontPageRoute + '/' + item._id)
        .error(logError);
    };

    /**
     * Dtosaua (Internal Page) CRUD
     */
    
    var dtosauaRoute = '/api/cms/dtosaua';
    cmsServer.dtosauaSection = {};

    cmsServer.dtosauaSection.create = function (item) {
      return $http.post(dtosauaRoute, item)
        .error(logError);
    };

    cmsServer.dtosauaSection.getOne = function (id) {
      return $http.get(dtosauaRoute + '/' + id)
        .error(logError);
    };

    cmsServer.dtosauaSection.getAll = function () {
      return $http.get(dtosauaRoute)
        .error(logError);
    };

    cmsServer.dtosauaSection.update = function (item) {
      return $http.put(dtosauaRoute + '/' + item._id, item)
        .error(logError);
    };

    cmsServer.dtosauaSection.destroy = function (item) {
      return $http.delete(dtosauaRoute + '/' + item._id)
        .error(logError);
    };

    /**
     * Return CMS Server
     */
    
    return cmsServer;

  });
};