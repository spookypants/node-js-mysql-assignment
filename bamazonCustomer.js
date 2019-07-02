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

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connect as ID: " + connection.threadId);
    displayInventory();
});

// User Prompts
var productPurchasePrompt = {
    type: "input",
    message: "Enter the ID of the product you would like to purchase:",
    name: "product_purchase"
};

var productQuantityPrompt = {
    type: "input",
    message: "How many units would you like to purchase?",
    name: "product_quantity"
};

var reinitializePrompt = {
    type: "list",
    message: "Would you like to make additional purchases?",
    choices: ["Yes, please.", "Nah, bruh."],
    name: "reinitialize_prompt"
};

// Display inventory
var displayInventory = function(){
    connection.query("SELECT * FROM products", function(err,res){
        console.log("DISPLAYING INVENTORY:" + "\n" + "--------------------");
        for (var i=0; i < res.length; i++) {
            console.log("Item ID: " + res[i].item_id + "\n" + "Product Name: " + res[i].product_name + "\n" 
            + "Price: " + res[i].price + "\n" + "Quantity Available: " + res[i].stock_quantity + "\n--------------------");
        }
        // promptCustomer(res);
    })
}