const { DataTypes, Model } = require('sequelize');
const sequelize = require('../setup');

class IpRecord extends Model {}

IpRecord.init(
  {
    ipAddress: { type: DataTypes.STRING, allowNull: false },
    label: { type: DataTypes.STRING },
    userId: { type: DataTypes.INTEGER, allowNull: false },
    serviceId: { type: DataTypes.INTEGER, allowNull: true }
  },
  { sequelize, modelName: 'IpRecord' }
);

module.exports = IpRecord;
