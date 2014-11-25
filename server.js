'use strict';

var http = require('http');
var express = require('express');
var bodyparser = require('body-parser');
var mongoose = require('mongoose');
var passport = require('passport');

var app = express();

app.use(express.static(__dirname + '/build'));

mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/db');

app.set('jwtTokenSecret', process.env.JWT_SECRET || 'developmentsecret');
app.set('secret', process.env.SECRET || 'developmentsecret');

app.use(passport.initialize());

require('./lib/passport')(passport);
// var jwtauth = require('./lib/jwtauth')(app);

app.use(bodyparser.json());
require('./routes/user-routes')(app, passport);
// require('./routes/note-routes')(app, jwtauth.auth);





var server = http.createServer(app);

app.set('port', process.env.PORT || 3000);

server.listen(app.get('port'),function(){
  console.log('Sever has started on ' + app.get('port'));
});