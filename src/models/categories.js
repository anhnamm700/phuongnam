'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Categories extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // Categories.hasMany(models.Brands, { foreignKey: 'category_id' })
      Categories.hasMany(models.Brands, {
        foreignKey: 'category_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });

      Categories.hasMany(models.Products, {
        foreignKey: 'cate_id',
        onDelete: 'NO ACTION',
        onUpdate: 'NO ACTION'
      });
    }
  };
  Categories.init({
    name: DataTypes.STRING,
    slug: DataTypes.STRING,
    icon: DataTypes.STRING,
    avatar: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    total_products: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'Categories',
  });
  return new Categories;
};