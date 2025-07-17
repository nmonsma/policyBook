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
app.use('/epcspolicy', express.static(path.join(__dirname, 'public')));

//MySQL Setup
const mysql = require('mysql2');
const dbConnection = mysql.createConnection({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database
});

//Connect to MySQL
dbConnection.connect((err) => {
    if (err) throw err;
    console.log('connected to database');
  });
  
  //Create Routes
  app.get('/epcspolicy/all_policies', (req, res) => {
    dbConnection.query('SELECT * FROM policies ORDER BY policy_number', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  app.get('/epcspolicy/employee_policies', (req, res) => {
    dbConnection.query('SELECT * FROM policies WHERE handbook_e = 1 ORDER BY policy_number', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  app.get('/epcspolicy/family_policies', (req, res) => {
    dbConnection.query('SELECT * FROM policies WHERE handbook_f = 1 ORDER BY policy_number', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  app.get('/epcspolicy/extracurricular_policies', (req, res) => {
    dbConnection.query('SELECT * FROM policies WHERE handbook_x = 1 ORDER BY policy_number', (err, result) => {
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

  app.get('/epcspolicy/board_pending', (req, res) => {
    dbConnection.query("SELECT * FROM policies WHERE LOWER(entity) LIKE '%board%' AND NOT status = 'approved' ORDER BY policy_number", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/epcspolicy/admin_pending', (req, res) => {
    dbConnection.query("SELECT * FROM policies WHERE LOWER(entity) LIKE '%admin%' AND NOT status = 'approved' ORDER BY policy_number", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

//Create Alternate Routes
  //Create Routes
  app.get('/all_policies', (req, res) => {
    dbConnection.query('SELECT * FROM policies ORDER BY policy_number', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  app.get('/employee_policies', (req, res) => {
    dbConnection.query('SELECT * FROM policies WHERE handbook_e = 1 ORDER BY policy_number', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  app.get('/family_policies', (req, res) => {
    dbConnection.query('SELECT * FROM policies WHERE handbook_f = 1 ORDER BY policy_number', (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });
  
  app.get('/extracurricular_policies', (req, res) => {
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

  app.get('/board_pending', (req, res) => {
    dbConnection.query("SELECT * FROM policies WHERE LOWER(entity) LIKE '%board%' AND NOT status = 'approved' ORDER BY policy_number", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });

  app.get('/admin_pending', (req, res) => {
    dbConnection.query("SELECT * FROM policies WHERE LOWER(entity) LIKE '%admin%' AND NOT status = 'approved' ORDER BY policy_number", (err, result) => {
      if (err) throw err;
      res.json(result);
    });
  });


// //Route for namecheap shared hosting deployment
//   app.get('/epcspolicy', (req, res) => {
//     res.sendFile(path.join(__dirname, 'public', 'index.html'))
//   });

// Listen on port 3000
//change this to process.env.PORT for production
app.listen(process.env.PORT || 3000, function () {
    console.log('listening on port 3000')
})




