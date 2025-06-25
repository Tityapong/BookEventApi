

const mysql = require('mysql2');
require('dotenv').config();

const db = mysql.createConnection({
  host: process.env.DB_HOST,      // Railway DB host (e.g., something like 'db.railway.app')
  user: process.env.DB_USER,      // Railway DB username
  password: process.env.DB_PASSWORD, // Railway DB password
  database: process.env.DB_NAME,  // Your database name
  port: process.env.DB_PORT || 3306, // Default MySQL port (change if required)
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.message);
    process.exit(1);  // Stop the application if database connection fails
  }
  console.log('Connected to the MySQL database.');
});

module.exports = db;

// const mysql = require('mysql2');
// require('dotenv').config();

// // Create MySQL connection
// const db = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASSWORD,
//   database: process.env.DB_NAME,
//   port: process.env.DB_PORT || 3306,
// });

// // Connect to the database
// db.connect((err) => {
//   if (err) {
//     console.error('Error connecting to the database:', err.message);
//     process.exit(1);
//   }
//   console.log('Connected to the MySQL database.');
// });

// // Create a query function that wraps db.query in a Promise
// const query = (sql, params) => {
//   return new Promise((resolve, reject) => {
//     db.query(sql, params, (err, results) => {
//       if (err) {
//         return reject(err);
//       }
//       resolve(results);
//     });
//   });
// };

// module.exports = { query, db };

