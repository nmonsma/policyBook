//MySQL Setup
const mysql = require('mysql');
const connection = mysql.createConnection({
  host: 'policytesting.eastpalmyrachristianschool.com',
  user: 'epcspolicy',
  password: 'nqQ*j8xn0a3wSomZH3',
  database: 'policytesting'
});

connection.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL Database!');
  connection.query('SELECT * FROM policies', function(err, result) {
    if (err) throw err;
    console.log(result);
  });
});