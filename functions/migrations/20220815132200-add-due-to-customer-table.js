module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'customers',
          'due',
          { 
            type: Sequelize.DOUBLE,
            defaultValue: 0
          }
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'customers',
          'due'
      );
  }
};
  