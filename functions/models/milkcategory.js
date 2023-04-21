'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class MilkCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MilkCategory.belongsToMany(models.Invoice, {
        through: models.Transaction,
        foreignKey: 'categoryId',
        as: 'invoices',
        otherKey: 'invoiceId'
      });
      MilkCategory.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        as: 'customer'
      });
      MilkCategory.hasMany(models.Stock, {
        foreignKey: 'categoryId',
        as: 'stocks'
      })

      MilkCategory.hasOne(MilkCategory, {
        foreignKey: 'categoryId',
        as: 'special'
      })

      MilkCategory.belongsTo(MilkCategory, {
        foreignKey: 'categoryId',
        as: 'normal'
      })
    }
  }
  MilkCategory.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    name: DataTypes.STRING,
    rate: DataTypes.DOUBLE,
    customerId: DataTypes.UUID,
    categoryId: DataTypes.UUID,
    gstRate: DataTypes.DOUBLE,
    companyId: DataTypes.UUID,
    taxable: {
      type: DataTypes.ENUM,
      values: ['No', 'Yes'],
    },
    hsn: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'MilkCategory',
    tableName: 'milk_categories',
    underscored: true
  });
  return MilkCategory;
};