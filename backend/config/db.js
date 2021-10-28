require("dotenv").config();
const mysql = require('mysql2');

const con = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.REACT_APP_PASS,
    database: process.env.DB_NAME
})

module.exports = con.promise();


