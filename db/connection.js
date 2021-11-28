const mysql = require('mysql2')

// Connect to MySQL Database
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'employees'
},
    console.log('Connected to the employee database')
);

module.exports = db;