'use strict';

var request = require('request');
var util = require('util');

module.exports = function(app) {

  var publicApi = '/api/public/events';
  var adminApi = '/api/admin/calendar';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) !== -1) return true;
    else return false;
  }

  // buld query

  var params = {};
  params.calId = 'leidsmes3ofpmmttid821fett0@group.calendar.google.com';
  params.queryType = 'events';
  params.fields = 'fields=description%2Cetag%2Citems%2Ckind%2Csummary%2CtimeZone&key=';
  params.apiKey = process.env.GOOGLE_CAL_API_KEY;

  var publicEventsList = util.format(
      'https://www.googleapis.com/calendar/v3/calendars/%s/%s?%s%s',
      params.calId,
      params.queryType,
      params.fields,
      params.apiKey
    );

  // get all public events

  app.get(publicApi, function (req, res) {

    function respond (err, body) {
      if (err) {
        console.log(err);
        return res.send({'error':'google api took too long to respond'});
      }
      if (body) {
        return res.send(body);
      }
    }

    var timeout = setTimeout(respond, 2000);

    request.get(publicEventsList, function (err, response, body) {
      if (err) {
        respond(err);
      }
      if (body) {
        respond(null, body);
      }
    });

  });

};