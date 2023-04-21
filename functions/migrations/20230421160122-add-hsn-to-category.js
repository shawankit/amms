module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('milk_categories', 'hsn', {
      type: Sequelize.STRING,
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('milk_categories', 'hsn');
  }
};
