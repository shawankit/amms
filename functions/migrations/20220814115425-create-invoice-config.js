const uuid = require('uuid');
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('invoice_configs', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      prefix: {
        type: Sequelize.STRING
      },
      suffix: {
        type: Sequelize.STRING
      },
      number: {
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
    await queryInterface.bulkInsert('invoice_configs', [
      {prefix: 'AMMS', suffix: null, id: uuid.v4(), number: 0, created_at: new Date(), updated_at: new Date()}
    ], {});
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('invoice_configs');
  }
};