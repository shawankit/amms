module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.dropTable('stocks');
    await queryInterface.createTable('stocks', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID
      },
      categoryId: {
        type: Sequelize.UUID,
        field: 'category_id',
        references: {
            model: {
                tableName: 'milk_categories'
            },
            key: 'id'
        }
      },
      carryForward: {
        type: Sequelize.DOUBLE,
        field: 'carry_forward',
        defaultValue: 0,
      },
      morningQuantity: {
        type: Sequelize.DOUBLE,
        field: 'morning_quantity',
        defaultValue: 0,
      },
      eveningQuantity: {
        type: Sequelize.DOUBLE,
        field: 'evening_quantity',
        defaultValue: 0,
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
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('stocks');
  }
};