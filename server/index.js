var express = require("express");
var app = express();
var connection = require('./database');
var router = require('./routes');
var cors = require('cors');
// var bodyParser = require('body-parser');
// app.get('/', function(req, res) {
//     let sql = "SELECT * FROM job";
//     connection.query(sql, function(err, results){
//         if (err) throw err;
//         res.send(results);
//     });
// });

app.use(cors());
app.use(express.json({limit: "8mb"}));
app.use(router);

app.listen(8000, function(){
    console.log('App Listening on port 8000');
    connection.connect(function(err){
        if(err) throw err;
        console.log('Database connected!');
    })
});