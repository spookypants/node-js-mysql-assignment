DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;
USE bamazon_db;

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(50) NOT NULL,
    department_name VARCHAR(50) NULL,
    price DECIMAL(10,2) NULL,
    stock_quantity INT NULL,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES 
("Turtle (Alive)", "Animals", 45.00, 4000),
("Generic Ammunition", "Weapons", 2.00, 5000),
("Actual Ninja", "Exotic Assets", 600.00, 20),
("Gamer Fuel", "Food and Drink", 0.45, 7000),
("USS Enterprise", "Astro-nautical Vehicles", 60000000.00, 1),
("My Dad's Lawn Mower", "Home and Garden", 100.00, 1),
("Grandma's Ashes", "Home and Garden", 0.25, 6000),
("A Plant", "Home and Garden", 5.00, 500),
("Mystery Men (Blu-Ray)", "Entertainment", 2.00, 10000),
("My Roommate's Dog", "Animals", 0.10, 1);

SELECT * FROM products;