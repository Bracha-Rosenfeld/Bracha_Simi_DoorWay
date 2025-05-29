import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config({ path: '../.env' });

export var con = mysql.createConnection({
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