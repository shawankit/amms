'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('payment_receipts', 'additional_due', {
        type: Sequelize.DOUBLE,
        allowNull: true,
        defaultValue: 0
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('payment_receipts', 'additional_due');
  }
};
