/*Query Constants*/

/*Express and other requires*/
var path = require('path');
const POLICY_QUERIES = require('./sqlkeys.js');
const express = require('express');
const app = express();
const credentials = require('./credentials.js');

/* Middleware*/
//Configure the app to use Express:
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

console.log('App started at:', new Date().toLocaleString());

//MySQL Setup
const mysql = require('mysql2');
const dbConnection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
});
dbConnection.connect((err) => {
    if (err) throw err;
    console.log('connected to database');
  });
  
//Create Routes
  app.get('/epcspolicy/all_policies', (req, res) => {
    delete require.cache[require.resolve('./sqlkeys.js')];
    const POLICY_QUERIES = require('./sqlkeys.js');
    
    const sql = POLICY_QUERIES[req.query.filter];
    if (!sql) return res.status(400).json({ error: 'Invalid query key' });
    dbConnection.query(sql, (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/epcspolicy/headings', (req, res) => {
    dbConnection.query('SELECT * FROM headings ORDER BY heading_id', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/all_policies', (req, res) => {
    delete require.cache[require.resolve('./sqlkeys.js')];
    const POLICY_QUERIES = require('./sqlkeys.js');
    
    const sql = POLICY_QUERIES[req.query.filter];
    if (!sql) return res.status(400).json({ error: 'Invalid query key' });
    dbConnection.query(sql, (err, result) => {
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

  /*Spin up the Server for local use*/
app.use('/', express.static(path.join(__dirname, 'public')));
app.listen(3000, function () {
    console.log('listening')
    console.log('Routes registered:', app._router.stack.filter(r => r.route).map(r => r.route.path));
})