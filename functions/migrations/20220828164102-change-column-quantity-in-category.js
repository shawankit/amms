module.exports = {
  async up(queryInterface, Sequelize) {
     return queryInterface.changeColumn('transactions', 'quantity', {
        type: Sequelize.DOUBLE
      });
  },

  async down(queryInterface, Sequelize) {
     
  }
};
