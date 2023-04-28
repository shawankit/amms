'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_mode_details', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      type: {
        type: Sequelize.ENUM,
        values: ['CREDIT CARD', 'UPI', 'DEBIT CARD']
      },
      upiId: {
        type: Sequelize.STRING,
        field: 'upi_id'
      },
      cardNumber: {
        type: Sequelize.TEXT,
        field: 'card_number'
      },
      cardExpiry: {
        type: Sequelize.STRING,
        field: 'card_expiry'
      },
      cardHolderName: {
        type: Sequelize.STRING,
        field: 'card_holder_name'
      },
      customerId: {
        type: Sequelize.UUID,
        field: 'customer_id',
        references: {
          model: 'customers',
          key: 'id'
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'created_at'
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        field: 'updated_at'
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('payment_mode_details');
  }
};