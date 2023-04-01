'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('invoices', 'type', {
      type: Sequelize.ENUM,
      values: ['sale', 'purchase'],
      defaultValue: 'sale'
    });
  },


  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('invoices', 'type');
  }
};
