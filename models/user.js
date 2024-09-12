"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Account);
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email cannot be empty",
          },
          notNull: {
            msg: "email cannot be null",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "password cannot be empty",
          },
          notNull: {
            msg: "password cannot be null",
          },
          len: {
            args: [8],
            msg: "password must be at least 8 characters long",
          },
        },
      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "email cannot be empty",
          },
          notNull: {
            msg: "email cannot be null",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate(instance, option) {
          const salt = bcrypt.genSaltSync(10);
          const hash = bcrypt.hashSync(instance.password, salt);
          instance.password = hash;
        },
      },
      sequelize,
      modelName: "User",
    }
  );

  return User;
};
