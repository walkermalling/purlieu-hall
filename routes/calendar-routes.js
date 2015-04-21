'use strict';

var request = require('request');
var xml2js = require('xml2js');
var util = require('util');

var parser = new xml2js.Parser();

module.exports = function(app) {

  var publicApi = '/api/public/events';
  var adminApi = '/api/admin/calendar';

  function isAdmin (permission) {
    if (['dodo','admin'].indexOf(permission) !== -1) return true;
    else return false;
  }

  // get all public events
  
  var publicCal = 'https://www.google.com/calendar/feeds/leidsmes3ofpmmttid821fett0%40group.calendar.google.com/private-71b4e8a5fb8ed17992d6384490aa0b92/basic';

  app.get(publicApi, function (req, res) {
    request.get(publicCal, function pubCalCallback(err, response, body) {
      if (err) {
        return res.send({msg:'error'});
      }
      parser.parseString(body, function (err, result) {
        if (err) {
          return res.send({msg:'xml parse error'});
        }
        res.send(result);
      });
    });
  });

  // private calendar
  
  var privateCal = 'https://www.google.com/calendar/feeds/purlieuhall%40gmail.com/private-8e56d734a16b55f5a882b72c1c0a0cd9/basic';
    
  app.get(adminApi, function (req, res) {
    request.get(privateCal, function privateCalCallback (err, response, body) {
      if (err) {
        return res.send({msg:'error'});
      }
      parser.parseString(body, function (err, result) {
        if (err) {
          return res.send({msg:'xml parse error'});
        }
        res.send({});
      });
    });
  });

};