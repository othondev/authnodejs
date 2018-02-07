var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwtCon = require('./config/jwtconfig')
var jwt = require('jsonwebtoken');

mongoose.connect('mongodb://localhost/users', { useMongoClient: true });
mongoose.Promise = global.Promise;

var auth = require('./routes/auth');
var user = require('./routes/user');
let token = require('./routes/token');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/auth', auth);
app.use('/user',user);
app.use('/token',token);

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use(function(err, req, res, next) {  
  let error = new Error();
  error.message = err.message;
  error.statusCode=err.status || 500;

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(error.statusCode);
  res.json(error);
});

module.exports = app;
