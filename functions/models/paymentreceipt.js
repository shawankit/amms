'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentReceipt extends Model {
    static associate(models) {
      PaymentReceipt.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });
    }
  }
  PaymentReceipt.init({
    companyId: DataTypes.UUID,
    customerId: DataTypes.UUID,
    amountReceived: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'PaymentReceipt',
    tableName: 'payment_receipts',
    underscored: true
  });
  return PaymentReceipt;
};