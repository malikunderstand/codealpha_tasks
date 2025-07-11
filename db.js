// db.js
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // apne MySQL ka password likhen
  database: 'ecommerce', // apne database ka naam likhen
});

db.connect((err) => {
  if (err) {
    console.error('MySQL Connection Failed:', err);
  } else {
    console.log('✅ MySQL Connected!');
  }
});

module.exports = db;
