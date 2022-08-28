module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'milk_categories',
          'customer_id',
          {
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'customers',
                },
                key: 'id'
            }
          }
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'milk_categories',
          'customer_id'
      );
  }
};
  