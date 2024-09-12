const { Product, Category } = require("../models");
const category = require("../models/category");

class CustController {
  static async home(req, res) {
    try {
      const { search } = req.query

      let products = await Product.searchProduct(search)

      let categories = await Category.findAll()

      res.render('homepage', { title: 'Homepage', products, categories, rupiahFormat })
    } catch (error) {
      res.send(error.message);
    }
  }

  static async showCategories(req, res) {
    try {
      let products = await Product.findAll()
      let categories = await Category.findAll()

      res.render('allCategories', { title: 'All  Products', products, categories, rupiahFormat })
    } catch (error) {
      res.send(error.message);
    }
  }

  static async sortCategory(req, res) {
    try {
      const { CategoryId } = req.params

      let category = await Category.findByPk(+CategoryId, {
        include: {
          model: Product
        }
      })

      let categories = await Category.findAll()

      res.render('sortByCategory', { title: `${category.categoryName}`, category, categories, rupiahFormat })

    } catch (error) {
      res.send(error)
    }
  }

  static async buyProduct(req, res) {
    try {
      const { id } = req.params;
      let product = await Product.findByPk(+id, {
        include: [Category]
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async minStock(req, res) {
    try {
      const { id } = req.params
      let findProduct = await Product.findByPk(+id)
      await findProduct.decrement('stock', { by: 1 })
      res.redirect(`/buyer`)
    } catch (error) {
      res.send(error)
    }
  }
}



module.exports = CustController;
