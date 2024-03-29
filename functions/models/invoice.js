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
    companyId: DataTypes.UUID,
    invoiceNo: DataTypes.STRING,
    customerId: DataTypes.UUID,
    total: DataTypes.DOUBLE,
    paymentStatus: {
      type: DataTypes.ENUM,
      values: ['Not Paid', 'Partial Payment', 'Full Payment']
    },
    amountPaid: DataTypes.INTEGER,
    paymentDate: DataTypes.DATE,
    invoiceDate: DataTypes.DATE,
    type: {
      type: DataTypes.ENUM,
      values: ['sale', 'purchase'],
      defaultValue: 'sale'
    }
  }, {
    sequelize,
    modelName: 'Invoice',
    tableName: 'invoices',
    underscored: true
  });
  return Invoice;
};