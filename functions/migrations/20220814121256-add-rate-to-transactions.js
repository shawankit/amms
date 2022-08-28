module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'transactions',
          'rate',
          Sequelize.DOUBLE
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'transactions',
          'rate'
      );
  }
};
  