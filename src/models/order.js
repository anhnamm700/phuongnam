'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Orders.init({
    user_id: DataTypes.INTEGER,
    total_price: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    title: DataTypes.STRING,
    total_Orders: DataTypes.INTEGER,
    note: DataTypes.TEXT,
    voucher_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};