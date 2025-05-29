var mysql = require('mysql2');
const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

console.log(process.env.MYSQL_HOST);
console.log(process.env.MYSQL_USER);
console.log(process.env.MYSQL_PASSWORD);
console.log(process.env.MYSQL_DATABASE);

var con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    // database: process.env.MYSQL_DATABASE
});

con.connect(function(err) {
    if (err) {
        console.error('Error connecting to MySQL database:', err);
        return;
    }
    console.log('Connected to MySQL database');
});
module.exports = con.promise();
