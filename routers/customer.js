const express = require('express')
const customer = express.Router()
const CustController = require('../controllers/CustomerController')

buyer.get('/', CustController.home)
buyer.get('/categories', CustController.showCategories)
buyer.get('/categories/:CategoryId', CustController.sortCategory)

buyer.get('/buyProduct/:id', CustController.buyProduct)
buyer.get('/buyProduct/:id/stockDecrease', CustController.minStock)

module.exports = customer