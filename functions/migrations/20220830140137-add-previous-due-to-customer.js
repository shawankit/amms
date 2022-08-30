module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'customers',
          'previous_due',
          { 
            type:Sequelize.DOUBLE,
            defaultValue: 0
          }
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'customers',
          'previous_due'
      );
  }
};
  