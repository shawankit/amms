'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('transactions', {
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
      categoryId: {
        type: Sequelize.UUID,
        field: 'category_id',
        references: {
            model: {
                tableName: 'milk_categories'
            },
            key: 'id'
        }
      },
      invoiceId: {
        type: Sequelize.UUID,
        field: 'invoice_id',
        references: {
            model: {
                tableName: 'invoices'
            },
            key: 'id'
        }
      },
      quantity: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('transactions');
  }
};