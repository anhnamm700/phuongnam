'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transports extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Transports.hasMany(models.Orders, {
        foreignKey: 'transport_id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  };
  Transports.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Transports',
  });
  return Transports;
};