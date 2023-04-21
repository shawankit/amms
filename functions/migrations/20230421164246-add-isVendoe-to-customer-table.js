'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('customers', 'is_vendor', {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    });
  },


  async down (queryInterface) {
    await queryInterface.removeColumn('customers', 'is_vendor');
  }
};
