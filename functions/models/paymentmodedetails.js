'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PaymentModeDetails extends Model {
    static associate(models) {
      PaymentModeDetails.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
        });
      PaymentModeDetails.hasMany(models.PaymentReceipt, {
        foreignKey: 'paymentModeDetailsId',
        as: 'paymentReceipts'
      });
    }
  }
  PaymentModeDetails.init({
    type: {
      type: DataTypes.ENUM,
      values: ['CREDIT CARD', 'UPI', 'DEBIT CARD']
    },
    upiId: DataTypes.STRING,
    cardNumber: DataTypes.TEXT,
    cardExpiry: DataTypes.STRING,
    cardHolderName: DataTypes.STRING,
    customerId: DataTypes.UUID
  }, {
    sequelize,
    modelName: 'PaymentModeDetails',
    tableName: 'payment_mode_details',
    underscored: true,
  });
  return PaymentModeDetails;
};