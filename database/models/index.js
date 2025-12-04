const sequelize = require('../setup');
const User = require('./User');
const Service = require('./Service');
const IpRecord = require('./IpRecord');
const AccessLog = require('./AccessLog');

// Relationships
User.hasMany(IpRecord, { foreignKey: 'userId' });
IpRecord.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(IpRecord, { foreignKey: 'serviceId' });
IpRecord.belongsTo(Service, { foreignKey: 'serviceId' });

User.hasMany(AccessLog, { foreignKey: 'userId' });
AccessLog.belongsTo(User, { foreignKey: 'userId' });

Service.hasMany(AccessLog, { foreignKey: 'serviceId' });
AccessLog.belongsTo(Service, { foreignKey: 'serviceId' });

module.exports = {
  sequelize,
  User,
  Service,
  IpRecord,
  AccessLog
};
