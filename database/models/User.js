// User model: represents system users who can be linked to IP records
// and associated with services through those IP records.

const { DataTypes, Model } = require('sequelize');
const sequelize = require('../setup');

class User extends Model {}

User.init(
  {
    // Display name for the user, required field
    name: { 
      type: DataTypes.STRING, 
      allowNull: false 
    },

    // Email must be unique—used to identify users in the system
    email: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      unique: true 
    },

    // Role is used later for authorization (admin, security, auditor, etc.)
    role: { 
      type: DataTypes.STRING, 
      allowNull: false, 
      defaultValue: 'client' 
    }
  },
  { 
    sequelize, 
    modelName: 'User' // Maps to Users table in SQLite
  }
);

module.exports = User;
