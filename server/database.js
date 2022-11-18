var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'dbms',
    user: 'root',
    password: 'akhil@123'
});

module.exports = connection;