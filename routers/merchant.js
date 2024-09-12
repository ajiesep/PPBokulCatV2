const express = require('express')
const seller = express.Router()
const MerchantController = require('../controllers/MerchantController')

seller.get('/:sellerId', MerchantController.productList)

seller.get('/:sellerId/product/add', MerchantController.showAddProduct)
seller.post('/:sellerId/product/add', MerchantController.postAddProduct)

seller.get('/:sellerId/product/:id/edit', MerchantController.showEditProduct)
seller.post('/:sellerId/product/:id/edit', MerchantController.postEditProduct)

seller.get('/:sellerId/product/:id/delete', MerchantController.deleteProduct)

module.exports = seller