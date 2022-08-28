'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stock extends Model {
    static associate(models) {
      Stock.belongsTo(models.MilkCategory, {
        foreignKey: 'categoryId',
        as: 'milkCategory'
      });
    }
  }
  Stock.init({
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID
    },
    categoryId: DataTypes.UUID,
    morningQuantity: DataTypes.DOUBLE,
    eveningQuantity: DataTypes.DOUBLE,
    carryForward: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'Stock',
    tableName: 'stocks',
    underscored: true
  });
  return Stock;
};