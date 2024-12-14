const mysql = require('mysql2');
require('dotenv').config();

// Create MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);  // Stop the application if database connection fails
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db;
