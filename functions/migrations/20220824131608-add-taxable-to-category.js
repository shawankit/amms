module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'milk_categories',
          'taxable',
          { 
            type: Sequelize.ENUM,
            values: ['No', 'Yes'],
            defaultValue: 'No'
          }
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'milk_categories',
          'taxable'
      );
  }
};
  