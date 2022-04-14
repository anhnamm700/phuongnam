'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // return queryInterface.bulkInsert('Users', [{
    //   firstName: 'Nam',
    //   lastName: 'Do',
    //   address: 'Thai Binh',
    //   email: 'namdohoai997@gmail.com',
    //   gender: 1,
    //   userName: 'anhnamm700',
    //   password: '123456',
    //   phoneNumber: 338873920,
    //   roleId: '1',
    //   image: '',
    //   createdAt: new Date(),
    //   updatedAt: new Date()
    // }]);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
