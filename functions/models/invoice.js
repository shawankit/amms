'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Invoice extends Model {
    static associate(models) {
      Invoice.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });
      Invoice.belongsToMany(models.MilkCategory, {
        through: models.Transaction,
        foreignKey: 'invoiceId',
        as: 'milkCategory',
        otherKey: 'categoryId'
      });
    }
  }
  Invoice.init({
    invoiceNo: DataTypes.STRING,
    customerId: DataTypes.UUID,
    total: DataTypes.DOUBLE,
    paymentStatus: {
      type: DataTypes.ENUM,
      values: ['Not Paid', 'Partial Payment', 'Full Payment']
    },
    amountPaid: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'invoices',
    underscored: true
  });
  return Invoice;
};