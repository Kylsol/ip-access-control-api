const { DataTypes, Model } = require('sequelize');
const sequelize = require('../setup');

class Service extends Model {}

Service.init(
  {
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    description: { type: DataTypes.TEXT },
    active: { type: DataTypes.BOOLEAN, defaultValue: true }
  },
  { sequelize, modelName: 'Service' }
);

module.exports = Service;
