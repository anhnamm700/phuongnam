'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // OrderDetails.belongsTo(models.Orders);
      // models.Orders.hasMany(OrderDetails);

      // OrderDetails.belongsTo(models.Products);
      // models.Products.hasMany(OrderDetails);

      // OrderDetails.belongsTo(models.OrderStatus);
      // models.OrderStatus.hasMany(OrderDetails);

      // models.Orders(OrderDetails, {
      //   foreignKey: 'order_id'
      // });
      // OrderDetails.belongsTo(models.Orders);

      // models.Products(OrderDetails, {
      //   foreignKey: 'product_id'
      // });
      // OrderDetails.belongsTo(models.Products);

      // models.OrderStatus(OrderDetails, {
      //   foreignKey: 'order_status'
      // });
      // OrderDetails.belongsTo(models.OrderStatus);

      OrderDetails.belongsTo(models.Orders, {
        foreignKey: 'order_id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

      OrderDetails.belongsTo(models.OrderStatus, {
        foreignKey: 'order_status',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });

      OrderDetails.hasOne(models.Products, {
        foreignKey: 'id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });
    }
  };
  OrderDetails.init({
    product_id: DataTypes.INTEGER,
    unit_price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER, 
    total_price: DataTypes.INTEGER,
    order_id: DataTypes.STRING,
    order_status: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'OrderDetails',
  });
  return OrderDetails;
};