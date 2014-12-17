'use strict';

var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

app.use(express.static(__dirname + '/build'));

app.use(bodyparser.json());

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/purlieu-db');

app.set('jwtTokenSecret', process.env.JWT_SECRET || 'developmentsecret');
app.set('secret', process.env.SECRET || 'developmentsecret');

app.use(passport.initialize());
require('./lib/passport')(passport);

// var jwtauth = require('./lib/jwtauth')(app);

var server = http.createServer(app);
app.set('port', process.env.PORT || 3000);
exports.port = app.get('port');

require('./routes/user-routes')(app, passport);
require('./routes/login-routes')(app, passport);
require('./routes/frontpage-routes')(app);

server.listen(app.get('port'),function(){
  console.log('Sever has started on ' + app.get('port'));
});