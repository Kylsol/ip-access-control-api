const { Sequelize } = require('sequelize');
const path = require('path');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'ip-access-control.db'),
  logging: false
});

module.exports = sequelize;

if (require.main === module) {
  const { User, Service, IpRecord, AccessLog } = require('./models');

  sequelize
    .sync({ force: true })
    .then(() => {
      console.log('Database synced');
      process.exit(0);
    })
    .catch(err => {
      console.error('Sync error:', err);
      process.exit(1);
    });
}
