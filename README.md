# node-js-mysql-assignment
Due 7/1/2019


## About This Application

This application simulates a basic online story inventory interface which allows users (aka customers) to browse products to purchase in user defined quantities. When the customer purchases a product, the MySQL database (aka store inventories) are updated to reflect the new values. This application uses Node.js, MySQL, and the Inquirer package.

## How To Use This Application

Upon initilizing the application inside the terminal with the command "node bamazonCustomer.js", the customer is presented with the current store inventory, which includes the product name, price, and currently available purchasble quantity.

Products are automatically assigned unique item ID numbers, and after browsing through the current store inventory, the customer is then prompted to enter the unique item ID number corresponding to the product which they would like to purchase. The customer is then prompted for how many units of the product which they would like to purchase.

If the amount of units which the customer enters is less than or equal to the current inventory value of the selected product, the customer's inputted value is then subtracted from the available product quantity and the new total is updated within the MySQL database.

The customer is then shown a message confirming their purchase, and they are then prompted to continue shopping or leave the storefront.

If the customer attempts to purchase a product quantity which is larger than the current product inventory, an insufficient quantity prompt is populated and the customer is returned to the initial storefront prompt.




## Instructions

### Challenge #1: Customer View (Minimum Requirement)

1. Create a MySQL Database called `bamazon`.

2. Then create a Table inside of that database called `products`.

3. The products table should have each of the following columns:

   * item_id (unique id for each product)

   * product_name (Name of product)

   * department_name

   * price (cost to customer)

   * stock_quantity (how much of the product is available in stores)

4. Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

5. Then create a Node application called `bamazonCustomer.js`. Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.

6. The app should then prompt users with two messages.

   * The first should ask them the ID of the product they would like to buy.
   * The second message should ask how many units of the product they would like to buy.

7. Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

   * If not, the app should log a phrase like `Insufficient quantity!`, and then prevent the order from going through.

8. However, if your store _does_ have enough of the product, you should fulfill the customer's order.
   * This means updating the SQL database to reflect the remaining quantity.
   * Once the update goes through, show the customer the total cost of their purchase.
