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
      PaymentReceipt.belongsTo(models.PaymentModeDetails, {
        foreignKey: 'paymentModeDetailsId',
        as: 'paymentModeDetails'
      });
    }
  }
  PaymentReceipt.init({
    companyId: DataTypes.UUID,
    customerId: DataTypes.UUID,
    amountReceived: DataTypes.DOUBLE,
    paymentMode: {
      type: DataTypes.ENUM,
      values: ['CREDIT CARD', 'UPI', 'DEBIT CARD', 'CASH']
    },
    paymentModeDetailsId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'PaymentReceipt',
    tableName: 'payment_receipts',
    underscored: true
  });
  return PaymentReceipt;
};