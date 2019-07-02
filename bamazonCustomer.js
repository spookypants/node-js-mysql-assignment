// NPM requirements
var mysql = require("mysql");
var inquirer = require("inquirer");

// Connecting to MySQL database
var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "bamazon_db"  
});