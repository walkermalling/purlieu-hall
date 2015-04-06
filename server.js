'use strict';

require('./app/init');

var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var server;

var app = express();
app.use(express.static(__dirname + '/build'));
app.use(bodyparser.json());

// connect to database

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/purlieu-db');

// security

app.set('jwtTokenSecret', process.env.JWT_SECRET || 'developmentsecret');
app.set('secret', process.env.SECRET || 'developmentsecret');

var jwtauth = require('./lib/jwtauth')(app);

app.use(passport.initialize());
require('./lib/passport')(passport);

// configure server

server = http.createServer(app);
app.set('port', process.env.PORT || 3000);
exports.port = app.get('port');

// routes

require('./routes/user-routes')(app, passport, jwtauth.auth);
require('./routes/login-routes')(app, passport);
require('./routes/frontpage-routes')(app);
require('./routes/calendar-routes')(app);
require('./routes/frontpage-cms-routes')(app, jwtauth.auth);
require('./routes/dtosaua-section-routes')(app, jwtauth.auth);
require('./routes/dtosaua-cms-routes')(app, jwtauth.auth);

// listen

server.listen(app.get('port'),function(){
  console.log('Sever has started on ' + app.get('port'));
});