'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InvoiceConfig extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  InvoiceConfig.init({
    prefix: DataTypes.STRING,
    suffix: DataTypes.STRING,
    companyId: DataTypes.UUID,
    number: DataTypes.INTEGER
  }, {
    sequelize,
    tableName: 'invoice_configs',
    modelName: 'InvoiceConfig',
    underscored: true
  });
  return InvoiceConfig;
};