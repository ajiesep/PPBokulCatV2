const { Product, Category } = require("../models");
const { Op } = require("sequelize");
const rupiahFormat = require("../helpers/rupiahFormat.js");
const qr = require("qrcode");

class CustController {
  // search di hompage
  static async home(req, res) {
    try {
      const { search } = req.query;

      let products = await Product.searchProduct(search);

      let categories = await Category.findAll();

      res.render("homepage", {
        title: "Homepage",
        products,
        categories,
        rupiahFormat,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async showCategories(req, res) {
    try {
      let products = await Product.findAll();
      let categories = await Category.findAll();

      res.render("allCategories", {
        title: "All  Products",
        products,
        categories,
        rupiahFormat,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async sortCategory(req, res) {
    try {
      const { CategoryId } = req.params;

      let category = await Category.findByPk(+CategoryId, {
        include: {
          model: Product,
        },
      });

      let categories = await Category.findAll();

      res.render("sortByCategory", {
        title: `${category.categoryName}`,
        category,
        categories,
        rupiahFormat,
      });
    } catch (error) {
      res.send(error);
    }
  }

  static async buyProduct(req, res) {
    try {
      const { id } = req.params;
      let product = await Product.findByPk(+id, {
        include: [Category],
      });
      // ngambil dari static method di model
      let dataQR = await Product.dataQR(+id);

      dataQR = JSON.stringify(dataQR);

      qr.toDataURL(dataQR, (err, qrDataURL) => {
        if (err) {
          console.error(err);
          return res.status(500).send("Error generating QR code");
        }

        res.render("buyProduct", {
          title: "Buy Product",
          product,
          rupiahFormat,
          qrDataURL,
        });
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async minStock(req, res) {
    try {
      const { id } = req.params;
      let findProduct = await Product.findByPk(+id);
      await findProduct.decrement("stock", { by: 1 });
      res.redirect(`/customer`);
    } catch (error) {
      res.send(error);
    }
  }
}

module.exports = CustController;
