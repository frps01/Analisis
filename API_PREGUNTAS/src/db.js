// Import mysql2 to handle MySQL connections
const mysql = require('mysql2');
// Load environment variables from .env file
require('dotenv').config();

console.log('Connecting to MySQL with the following config:');
console.log({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10)
});

// Changed from mysql.createConnection(...) to createPool(...) ⬇️
// This avoids using .connect() manually, and is better for production + Docker
const database = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: parseInt(process.env.DB_PORT, 10),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = database;