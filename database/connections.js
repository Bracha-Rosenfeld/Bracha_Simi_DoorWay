var mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });
var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
});

con.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
    con.query('USE ' + process.env.MYSQL_DATABASE, function (err, result) {
        if (err) {
            console.error('Error selecting database:', err);
            return;
        }
        console.log('Database selected:', process.env.MYSQL_DATABASE);
    });
});
module.exports = con.promise();
