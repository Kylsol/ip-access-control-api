// Import Sequelize and utilities for building the SQLite file path.
const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize a new Sequelize instance using SQLite.
// This handles the database connection for the entire application.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, 'ip-access-control.db'), // Local SQLite DB file
  logging: false // Disable SQL query logging to keep output clean
});

// Export the Sequelize instance for use in models and other modules.
module.exports = sequelize;

// -----------------------------------------------
// Optional CLI Mode: Sync database when this file
// is executed directly through Node.
// -----------------------------------------------
// This allows running: `node database/setup.js`
// to rebuild the schema without using a separate script.
if (require.main === module) {
  const { User, Service, IpRecord, AccessLog } = require('./models');

  sequelize
    .sync({ force: true }) // Drops and recreates all tables
    .then(() => {
      console.log('Database synced');
      process.exit(0);
    })
    .catch(err => {
      console.error('Sync error:', err);
      process.exit(1);
    });
}
