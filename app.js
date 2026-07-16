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

//MySQL Setup - connection pool instead of a single connection.
//A pool automatically opens a fresh connection whenever one has gone
//stale/dropped, instead of permanently failing until the process restarts.
const mysql = require('mysql2');
const pool = mysql.createPool({
  host: credentials.host,
  user: credentials.user,
  password: credentials.password,
  database: credentials.database,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelay: 10000,
  // Recycle idle connections ourselves before the MySQL server's own
  // wait_timeout has a chance to silently close them out from under us.
  idleTimeout: 60000,
  maxIdle: 10
});

//CRITICAL: mysql2 pools can emit a plain 'error' event (rather than routing
//the error to a query callback) when a pooled connection was already closed
//by the MySQL server - e.g. after sitting idle past its wait_timeout. In
//Node, an 'error' event with no listener is treated as an uncaught exception
//and crashes the whole process - which is what was taking down every route
//at once. These listeners make sure that error gets logged instead of
//crashing the app.
pool.on('error', (err) => {
  console.error('MySQL pool error (recovered, app kept running):', err);
});
pool.on('connection', (connection) => {
  connection.on('error', (err) => {
    console.error('MySQL connection error (recovered, app kept running):', err);
  });
});

//Quick sanity check at startup so we still get a "connected to database" log,
//without holding a single long-lived connection open for the app's lifetime.
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Database connection failed at startup:', err);
    return;
  }
  console.log('connected to database');
  connection.release();
});

//Simple request logger so every hit shows up in stderr/stdout, even ones
//that error out before reaching a route handler.
app.use((req, res, next) => {
  console.log(new Date().toISOString(), req.method, req.originalUrl);
  next();
});

//Shared error handler for query callbacks - logs the real error server-side
//and returns a clean JSON 500 instead of throwing (which could crash the process).
function handleQueryError(err, res) {
  console.error('Database query error:', err);
  res.status(500).json({ error: 'Database error' });
}

//Wraps pool.query in a try/catch as a second layer of protection, in case an
//error is ever thrown synchronously instead of being delivered to the
//callback (belt-and-braces alongside the pool-level 'error' listeners above).
function safeQuery(sql, res, callback) {
  try {
    pool.query(sql, (err, result) => {
      if (err) return handleQueryError(err, res);
      callback(result);
    });
  } catch (err) {
    handleQueryError(err, res);
  }
}

//Create Routes
app.get('/epcspolicy/all_policies', (req, res) => {
  delete require.cache[require.resolve('./sqlkeys.js')];
  const POLICY_QUERIES = require('./sqlkeys.js');

  const sql = POLICY_QUERIES[req.query.filter];
  if (!sql) return res.status(400).json({ error: 'Invalid query key' });
  safeQuery(sql, res, (result) => {
    res.json(result);
  });
});

app.get('/epcspolicy/employee_policies', (req, res) => {
  safeQuery('SELECT * FROM policies WHERE handbook_e = 1 ORDER BY policy_number', res, (result) => {
    res.json(result);
  });
});

app.get('/epcspolicy/family_policies', (req, res) => {
  safeQuery('SELECT * FROM policies WHERE handbook_f = 1 ORDER BY policy_number', res, (result) => {
    res.json(result);
  });
});

app.get('/epcspolicy/extracurricular_policies', (req, res) => {
  safeQuery('SELECT * FROM policies WHERE handbook_x = 1 ORDER BY policy_number', res, (result) => {
    res.json(result);
  });
});

app.get('/epcspolicy/headings', (req, res) => {
  safeQuery('SELECT * FROM headings ORDER BY heading_id', res, (result) => {
    res.json(result);
  });
});

app.get('/epcspolicy/board_pending', (req, res) => {
  safeQuery("SELECT * FROM policies WHERE LOWER(entity) LIKE '%board%' AND NOT status = 'approved' ORDER BY policy_number", res, (result) => {
    res.json(result);
  });
});

app.get('/epcspolicy/admin_pending', (req, res) => {
  safeQuery("SELECT * FROM policies WHERE LOWER(entity) LIKE '%admin%' AND NOT status = 'approved' ORDER BY policy_number", res, (result) => {
    res.json(result);
  });
});

app.get('/epcspolicy/approved', (req, res) => {
  safeQuery("SELECT * FROM policies WHERE status = 'approved' ORDER BY policy_number", res, (result) => {
    res.json(result);
  });
});

app.get('/epcspolicy/amended', (req, res) => {
  safeQuery("SELECT * FROM policies WHERE status = 'amended' ORDER BY policy_number", res, (result) => {
    res.json(result);
  });
});


//Create Alternate Routes
app.get('/all_policies', (req, res) => {
  delete require.cache[require.resolve('./sqlkeys.js')];
  const POLICY_QUERIES = require('./sqlkeys.js');

  const sql = POLICY_QUERIES[req.query.filter];
  if (!sql) return res.status(400).json({ error: 'Invalid query key' });
  safeQuery(sql, res, (result) => {
    res.json(result);
  });
});

app.get('/employee_policies', (req, res) => {
  safeQuery('SELECT * FROM policies WHERE handbook_e = 1 ORDER BY policy_number', res, (result) => {
    res.json(result);
  });
});

app.get('/family_policies', (req, res) => {
  safeQuery('SELECT * FROM policies WHERE handbook_f = 1 ORDER BY policy_number', res, (result) => {
    res.json(result);
  });
});

app.get('/extracurricular_policies', (req, res) => {
  safeQuery('SELECT * FROM policies WHERE handbook_x = 1 ORDER BY policy_number', res, (result) => {
    res.json(result);
  });
});

app.get('/headings', (req, res) => {
  safeQuery('SELECT * FROM headings ORDER BY heading_id', res, (result) => {
    res.json(result);
  });
});

app.get('/board_pending', (req, res) => {
  safeQuery("SELECT * FROM policies WHERE LOWER(entity) LIKE '%board%' AND NOT status = 'approved' ORDER BY policy_number", res, (result) => {
    res.json(result);
  });
});

app.get('/admin_pending', (req, res) => {
  safeQuery("SELECT * FROM policies WHERE LOWER(entity) LIKE '%admin%' AND NOT status = 'approved' ORDER BY policy_number", res, (result) => {
    res.json(result);
  });
});

app.get('/approved', (req, res) => {
  safeQuery("SELECT * FROM policies WHERE status = 'approved' ORDER BY policy_number", res, (result) => {
    res.json(result);
  });
});

app.get('/amended', (req, res) => {
  safeQuery("SELECT * FROM policies WHERE status = 'amended' ORDER BY policy_number", res, (result) => {
    res.json(result);
  });
});

//Catch-all handler for anything that slips through unhandled (belt-and-braces
//so a bug elsewhere can't crash the whole process and take every route down).
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

/*Spin up the Server for online use*/
app.use('/epcspolicy', express.static(path.join(__dirname, 'public')));
app.listen(process.env.PORT, function () {
  console.log('listening on port', process.env.PORT);
  console.log('Routes registered:', app._router.stack.filter(r => r.route).map(r => r.route.path));
})

/*Spin up the Server for local use*/
// app.use('/', express.static(path.join(__dirname, 'public')));
// app.listen(3000, function () {
//     console.log('listening')
//     console.log('Routes registered:', app._router.stack.filter(r => r.route).map(r => r.route.path));
// })