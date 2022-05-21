'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // User.belongsTo(models.Roles);
      // models.Roles.hasMany(User);

      // models.Roles(User, {
      //   foreignKey: 'order_status'
      // });
      // User.belongsTo(models.Roles);

      User.hasMany(models.Orders, {
        foreignKey: 'user_id',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });

      User.belongsTo(models.Roles, {
        foreignKey: 'roleId',
        onDelete: 'RESTRICT',
        onUpdate: 'RESTRICT'
      });
    }
  };
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    address: DataTypes.STRING,
    email: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    userName: DataTypes.STRING,
    password: DataTypes.STRING,
    phoneNumber: DataTypes.INTEGER,
    roleId: DataTypes.STRING,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};