//Express 
var createError = require('http-errors');
var express = require('express');
var app = express();
app.use(express.json());

//Databas - mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/coffecake');
const db = mongoose.connection;
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('connected to db'))

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
//Route files
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const breakfastRouter = require('./routes/breakfast');
const coffebreadRouter = require('./routes/coffebread');
const drinksRouter = require('./routes/drinks');

//routing
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/breakfast', breakfastRouter);
app.use('/coffebread', coffebreadRouter);
app.use('/drinks', drinksRouter);

//import joi
const Joi = require("joi");
//Importfs to communicate with json-file
const fs = require("fs").promises;
const cors = require('cors');
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//Server
app.listen(3000, () => console.log("server started"))

module.exports = app;


