const { DataTypes, Model } = require('sequelize');
const sequelize = require('../setup');

class AccessLog extends Model {}

AccessLog.init(
  {
    ipAddressTried: { type: DataTypes.STRING, allowNull: false },
    decision: { type: DataTypes.STRING, allowNull: false }, // "allowed" or "denied"
    reason: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: true },
    serviceId: { type: DataTypes.INTEGER, allowNull: true }
  },
  { sequelize, modelName: 'AccessLog' }
);

module.exports = AccessLog;
