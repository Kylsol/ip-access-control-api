const { DataTypes, Model } = require('sequelize');
const sequelize = require('../setup');

class User extends Model {}

User.init(
  {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    role: { type: DataTypes.STRING, allowNull: false, defaultValue: 'client' }
  },
  { sequelize, modelName: 'User' }
);

module.exports = User;
