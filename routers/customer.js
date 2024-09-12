const express = require("express");
const customer = express.Router();
const CustController = require("../controllers/CustomerController");

customer.get("/", CustController.home);
customer.get("/categories", CustController.showCategories);
customer.get("/categories/:CategoryId", CustController.sortCategory);

customer.get("/buyProduct/:id", CustController.buyProduct);
customer.get("/buyProduct/:id/stockDecrease", CustController.minStock);

module.exports = customer;
