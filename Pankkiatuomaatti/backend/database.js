const mysql = require("mysql");
const dotenv = require("dotenv");

dotenv.config();

const connection = mysql.createConnection({
  host: "70.34.197.100",
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: "bankdb",
});
module.exports = connection;
