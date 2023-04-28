'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('payment_receipts', 'payment_mode', {
      type: Sequelize.ENUM,
      values: ['CREDIT CARD', 'UPI', 'DEBIT CARD', 'CASH'],
      defaultValue: 'CASH'
    });
    await queryInterface.addColumn('payment_receipts', 'payment_mode_details_id', {
      type: Sequelize.UUID,
      references: {
        model: 'payment_mode_details',
        key: 'id'
      }
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('payment_receipts', 'payment_mode');
    await queryInterface.removeColumn('payment_receipts', 'payment_mode_details_id');
  }
};
