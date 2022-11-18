var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    database: 'dbms_project',
    user: 'root',
    password: 'akhil@123'
});

module.exports = connection;