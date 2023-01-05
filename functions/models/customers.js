'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Customer extends Model {
    static associate(models) {
      // define association here
      Customer.hasMany(models.Invoice, {
        foreignKey: 'customerId',
        as: 'invoices'
      })
      Customer.hasMany(models.MilkCategory, {
        foreignKey: 'customerId',
        as: 'milkCategories'
      });
      Customer.hasMany(models.PaymentReceipt, {
        foreignKey: 'customerId',
        as: 'paymentReceipts'
      })
    }
  }
  Customer.init({
    name: DataTypes.STRING,
    type: {
      type: DataTypes.ENUM,
      values: ['normal', 'special'],
      defaultValue: 'normal'
    },
    mobile: DataTypes.STRING,
    due: DataTypes.DOUBLE,
    companyId: DataTypes.UUID,
    previousDue: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Customer',
    tableName: 'customers',
    underscored: true
  });
  return Customer;
};