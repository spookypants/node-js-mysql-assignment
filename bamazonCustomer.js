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
        promptCustomer(res);
    })
}

var promptCustomer = function(res){
    inquirer.prompt([productPurchasePrompt]).then(function(inquirerResponse){
        var chosenProductID = parseInt(inquirerResponse.product_purchase);
        for (var i=0; i < res.length; i++){
            if(res[i].item_id === chosenProductID){
                var id = i;
                inquirer.prompt([productQuantityPrompt]).then(function(inquirerResponse){
                    var chosenQuantity = parseInt(inquirerResponse.product_quantity);

                    if ((res[id].stock_quantity - chosenQuantity) >= 0) {
                        var newQuantity = res[id].stock_quantity - chosenQuantity;
                        var totalCost = res[id].price * chosenQuantity;
                        var sql = "UPDATE ?? SET ?? = ? WHERE ?? = ?";
                        var values = ['products', 'stock_quantity', newQuantity, 'item_id', chosenProductID];
                        connection.query(sql, values, function(err, res){
                            if (err){
                                console.log(err);
                                connection.end();
                            }
                            console.log("Product(s) purchase!" + "\n" + "Total Transaction Cost: $" + totalCost);
                            inquirer.prompt([restartPrompt]).then(function(inquirerResponse){
                                if (inquirerResponse.restart_prompt === "Yes") {
                                    displayInventory();
                                } else {
                                    console.log("Thank you for shopping with Bamazon!");
                                    connection.end();
                                }
                            })
                        })
                    } else {
                        console.log("Insufficient Quantity! Please enter a lower quantity to purchase.");
                        promptCustomer(res);
                    }
                })
            }
        }
    })
}