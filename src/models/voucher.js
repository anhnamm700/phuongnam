'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Vouchers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Vouchers.init({
    logo: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    quantity: DataTypes.INTEGER,
    is_active: DataTypes.BOOLEAN,
    discount: DataTypes.INTEGER,
    out_of_date: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Vouchers',
  });
  return Vouchers;
};