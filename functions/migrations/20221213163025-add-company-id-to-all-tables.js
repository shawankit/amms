'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    const dataTypeObj = { 
      type: Sequelize.UUID,
      references: {
          model: {
              tableName: 'companies'
          },
          key: 'id'
      }
    };

    await queryInterface.addColumn(
      'users',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'customers',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'invoices',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'milk_categories',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'payment_receipts',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'stocks',
      'company_id',
      dataTypeObj
    );
    await queryInterface.addColumn(
      'invoice_configs',
      'company_id',
      dataTypeObj
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn(
      'customers',
      'company_id'
    );
    await queryInterface.removeColumn(
      'invoices',
      'company_id'
    );
    await queryInterface.removeColumn(
      'milk_categories',
      'company_id'
    );
    await queryInterface.removeColumn(
      'stocks',
      'company_id'
    );
    await queryInterface.removeColumn(
      'users',
      'company_id'
    );
    await queryInterface.removeColumn(
      'invoice_configs',
      'company_id'
    );
  }
};
