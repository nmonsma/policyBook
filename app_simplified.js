/*Express and other requires*/
var path = require('path');
const express = require('express');
const app = express();
const credentials = require('./credentials.js');

/* Middleware*/
//Configure the app to use Express:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*Spin up the Server*/
app.use(express.static('public'))

//MySQL Setup
const mysql = require('mysql2')
const dbConnection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
})

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

// Listen on port 3000
app.listen(3000, function () {
    console.log('listening on port 3000')
})
