const { Product, Category, AccountProduct, Account } = require("../models");
const { Op } = require("sequelize");
const rupiahFormat = require("../helpers/rupiahFormat.js");
const accountproduct = require("../models/accountproduct");

class MerchantController {
  // ngambil data
  static async listProduct(req, res) {
    try {
      const { deleted } = req.query;
      const { merchantId } = req.params;
      let products = await Product.findAll({
        include: [
          {
            model: Category,
          },
          {
            model: Account,
            where: { id: merchantId },
          },
        ],
        order: ["productName"],
      });
      let account = await Account.findByPk(merchantId);
      res.render("merchantProducts", {
        title: `Merchant Products`,
        products,
        rupiahFormat,
        deleted,
        merchantId,
        account,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async addProduct(req, res) {
    try {
      const { errors } = req.query;
      const { merchantId } = req.params;
      let categories = await Category.findAll();

      res.render("addProduct", {
        title: "Add Product",
        categories,
        errors,
        merchantId,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postProduct(req, res) {
    try {
      const { merchantId } = req.params;
      const { productName, imageURL, CategoryId, price, stock, description } =
        req.body;
      let newProduct = await Product.create({
        productName,
        imageURL,
        CategoryId,
        price,
        stock,
        description,
      });

      await AccountProduct.create({
        AccountId: merchantId,
        ProductId: newProduct.id,
      });

      res.redirect(`/merchant/${merchantId}`);
    } catch (error) {
      const { merchantId } = req.params;
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        error = error.errors.map((e) => {
          return e.message;
        });
        res.redirect(`/merchant/${merchantId}/product/add?errors=${error}`);
      } else {
        res.send(error.message);
      }
    }
  }
  static async editProduct(req, res) {
    try {
      const { errors } = req.query;
      const { id, merchantId } = req.params;
      const product = await Product.findByPk(id);
      const categories = await Category.findAll();
      res.render("editProduct", {
        title: "Edit Product",
        product,
        categories,
        errors,
        merchantId,
      });
    } catch (error) {
      res.send(error.message);
    }
  }

  static async postEditProduct(req, res) {
    try {
      const { id, merchantId } = req.params;
      const { productName, imageURL, CategoryId, price, stock, desription } =
        req.body;

      await Product.update(
        { productName, imageURL, CategoryId, price, stock, desription },
        { where: { id } }
      );
      res.redirect(`/merchant/${merchantId}`);
    } catch (error) {
      const { id, merchantId } = req.params;
      if (
        error.name === "SequelizeValidationError" ||
        error.name === "SequelizeUniqueConstraintError"
      ) {
        error = error.errors.map((e) => e.message);
        res.redirect(
          `/merchant/${merchantId}/product/${id}/edit?errors=${error}`
        );
      } else {
        res.send(error.message);
      }
    }
  }

  static async deleteProduct(req, res) {
    try {
      const { id, merchantId } = req.params;
      let deletedProduct = await Product.findByPk(+id);

      await AccountProduct.destroy({
        where: { AccountId: merchantId, ProductId: id },
      });
      await Product.destroy({ where: { id } });
      res.redirect(
        `/merchant/${merchantId}?deleted=${deletedProduct.productName}`
      );
    } catch (error) {
      res.send(error.message);
    }
  }
}

module.exports = MerchantController;
