module.exports = {
  async up(queryInterface, Sequelize) {
      return queryInterface.addColumn(
          'milk_categories',
          'category_id',
          {
            type: Sequelize.UUID,
            references: {
                model: {
                    tableName: 'milk_categories',
                },
                key: 'id'
            }
          }
      );
  },

  async  down(queryInterface, Sequelize) {
      return queryInterface.removeColumn(
          'milk_categories',
          'category_id'
      );
  }
};
  