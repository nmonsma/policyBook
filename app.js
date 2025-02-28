var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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
const mysql = require('mysql')
const dbConnection = mysql.createConnection({
  host: 'policy.eastpal.org',
  user: 'epcspolicy',
  password: 'nqQ*j8xn0a3wSomZH3',
  database: 'policyrepository'
})

//Connect to MySQL
dbConnection.connect((err) => {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
});

//Create Routes
app.get('/allPolicies', (req, res) => {
  dbConnection.query('SELECT * FROM policies ORDER BY policy_number', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/employeePolicies', (req, res) => {
  dbConnection.query('SELECT * FROM policies WHERE employee IS NOT NULL ORDER BY policy_number', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/familyPolicies', (req, res) => {
  dbConnection.query('SELECT * FROM policies WHERE family IS NOT NULL ORDER BY policy_number', (err, result) => {
    if (err) throw err;
    res.json(result);
  });
});

app.get('/extracurricularPolicies', (req, res) => {
  dbConnection.query('SELECT * FROM policies WHERE extracurricular IS NOT NULL ORDER BY policy_number', (err, result) => {
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




