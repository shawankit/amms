module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'milk_categories',
          'gst_rate',
          { 
            type: Sequelize.DOUBLE,
            defaultValue: 0
          }
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'milk_categories',
          'gst_rate'
      );
  }
};
  