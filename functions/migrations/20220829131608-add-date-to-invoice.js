module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'invoices',
          'invoice_date',
          Sequelize.DATE
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'invoices',
          'invoice_date'
      );
  }
};
  