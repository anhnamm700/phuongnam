'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Settings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Settings.init({
    logo: DataTypes.STRING,
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    phone: DataTypes.INTEGER,
    fax: DataTypes.INTEGER,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    copyright: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Settings',
  });
  return Settings;
};