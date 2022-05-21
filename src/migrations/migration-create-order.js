'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        type: Sequelize.STRING
        
      },
      user_id: {
        type: Sequelize.INTEGER
      },
      total_price: {
        type: Sequelize.INTEGER
      },
      description: {
        type: Sequelize.TEXT
      },
      title: {
        type: Sequelize.STRING
      },
      total_Orders: {
        type: Sequelize.INTEGER
      },
      note: {
        type: Sequelize.TEXT
      },
      voucher_id: {
        type: Sequelize.INTEGER
      },
      transport_id: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Orders');
  }
};