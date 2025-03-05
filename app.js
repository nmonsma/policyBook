var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var credentials = require('./credentials.json');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//MySQL Setup
const mysql = require('mysql2')
const dbConnection = mysql.createConnection(credentials)

//Connect to MySQL
dbConnection.connect((err) => {
  if (err) throw err;
  console.log('connected to database');
});

//Create Routes
app.get('/allPolicies', (req, res) => {
  dbConnection.query('SELECT * FROM policies ORDER BY policy_number', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/employeePolicies', (req, res) => {
  dbConnection.query('SELECT * FROM policies WHERE handbook_e = 1 ORDER BY policy_number', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/familyPolicies', (req, res) => {
  dbConnection.query('SELECT * FROM policies WHERE handbook_f = 1 ORDER BY policy_number', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/extracurricularPolicies', (req, res) => {
  dbConnection.query('SELECT * FROM policies WHERE handbook_x = 1 ORDER BY policy_number', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/headings', (req, res) => {
  dbConnection.query('SELECT * FROM headings ORDER BY heading_id', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

module.exports = app;




