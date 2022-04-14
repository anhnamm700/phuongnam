'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banners extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Banners.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    slug: DataTypes.STRING,
    image: DataTypes.STRING,
    is_active: DataTypes.BOOLEAN,
    url: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Banners',
  });
  return Banners;
};