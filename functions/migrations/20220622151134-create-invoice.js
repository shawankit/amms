'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoices', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      invoiceNo: {
        type: Sequelize.STRING,
        field: 'invoice_no',
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
      total: {
        type: Sequelize.DOUBLE
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
    await queryInterface.dropTable('invoices');
  }
};