'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('payment_receipts', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      customerId: {
        type: Sequelize.UUID,
        field: 'customer_id',
        references: {
            model: {
                tableName: 'customers'
            },
            key: 'id'
        }
      },
      amountReceived: {
        type: Sequelize.DOUBLE,
        field: 'amount_received',
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
    await queryInterface.dropTable('payment_receipts');
  }
};