const mysql = require("mysql2");
const dbConfig = require("./dbConfig");

// Create a connection to the database
const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
});

// open the MySQL connection
connection.connect(error => {
if (error) throw error;
    console.log("Successfully create db connection");
});

module.exports = connection;