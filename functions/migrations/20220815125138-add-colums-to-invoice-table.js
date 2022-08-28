module.exports = {
  async up(queryInterface, Sequelize) {
      await queryInterface.addColumn(
        'invoices',
        'amount_paid',
        { 
          type: Sequelize.DOUBLE,
          defaultValue: 0
        }
      );

      await queryInterface.addColumn(
          'invoices',
          'payment_status',
          {
            type: Sequelize.ENUM,
            values: ['Not Paid', 'Partial Payment', 'Full Payment'],
            defaultValue: 'Not Paid'
          }
      );

      await queryInterface.addColumn(
        'invoices',
        'payment_date',
        Sequelize.DATE
      );
  },

  async  down(queryInterface, Sequelize) {
      await queryInterface.removeColumn(
        'invoices',
        'amount_paid'
      );

      await queryInterface.removeColumn(
          'invoices',
          'payment_status'
      );

      await queryInterface.removeColumn(
        'invoices',
        'payment_date'
    );
  }
};
  