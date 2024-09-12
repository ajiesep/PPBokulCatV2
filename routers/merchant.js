const express = require('express')
const merchant = express.Router()
const MerchantController = require('../controllers/MerchantController')

merchant.get('/:merchantId', MerchantController.listProduct)

merchant.get('/:merchantId/product/add', MerchantController.addProduct)
merchant.post('/:merchantId/product/add', MerchantController.postProduct)

merchant.get('/:merchantId/product/:id/edit', MerchantController.editProduct)
merchant.post('/:merchantId/product/:id/edit', MerchantController.postEditProduct)

merchant.get('/:merchantId/product/:id/delete', MerchantController.deleteProduct)

module.exports = merchant