'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Products.belongsTo(models.Categories);
      // models.Categories.hasMany(Products);

      // models.Categories(Products, {
      //   foreignKey: 'cate_id'
      // });
      // Products.belongsTo(models.Categories);

      // Products.belongsTo(models.Brands);
      // models.Brands.hasMany(Products);

      Products.belongsTo(models.Brands, {
        foreignKey: 'brand_id',
      });

      // Products.belongsTo(models.Categories, {
      //   foreignKey: 'cate_id',
      // });

      Products.belongsTo(models.OrderDetails, {
        foreignKey: 'id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

    }
  };
  Products.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    cate_id: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    sale: DataTypes.INTEGER,
    is_hot: DataTypes.BOOLEAN,
    view: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    title: DataTypes.STRING,
    image: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    total_products: DataTypes.INTEGER,
    brand_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};