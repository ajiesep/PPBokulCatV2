"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Account.belongsTo(models.User);
      Account.belongsToMany(models.Product, { through: models.AccountProduct });
      Account.hasMany(models.AccountProduct);
    }
  }
  Account.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name cannot be Null",
          },
          notEmpty: {
            msg: "Name cannot be Empty",
          },
        },
      },
      address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Address cannot be Null",
          },
          notEmpty: {
            msg: "Address cannot be Empty",
          },
        },
      },
      phoneNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "PhoneNumber cannot be Null",
          },
          notEmpty: {
            msg: "PhoneNumber cannot be Empty",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Role cannot be Null",
          },
          notEmpty: {
            msg: "Role cannot be Empty",
          },
        },
      },
      UserId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Account",
    }
  );
  return Account;
};
