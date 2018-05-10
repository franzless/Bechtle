var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'start123',
  database: 'bechtle'
});

connection.connect();


module.exports = connection;