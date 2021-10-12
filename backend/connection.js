const mysql = require('mysql');
require("dotenv").config();

const con = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: process.env.REACT_APP_PASS,
    database:"daycarenew"
})


con.connect(function(err){
    if(err){
        console.error('error connecting: ' +err.stack);
        return
    }
    console.log("connected as id "+ con.threadId)});

module.exports = con


