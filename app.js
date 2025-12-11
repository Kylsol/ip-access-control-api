// app.js
require('dotenv').config();

const express = require('express');
const app = express();

const userRoutes = require('./routes/users');
const serviceRoutes = require('./routes/services');
const ipRoutes = require('./routes/ipRecords');
const logRoutes = require('./routes/logs');
const authRoutes = require('./routes/auth');

const { requireAuth, requireRole } = require('./middleware/auth');
const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

// Core middleware
app.use(express.json());
app.use(logger);

// Public auth routes
app.use('/auth', authRoutes);

// Protected / RBAC routes
app.use(
  '/users',
  requireAuth,
  requireRole('admin'), // only admins manage users
  userRoutes
);

// Example: services available to authenticated users
app.use('/services', requireAuth, serviceRoutes);

// Example: IP records available to admins + security roles
app.use(
  '/ips',
  requireAuth,
  requireRole('admin', 'security'),
  ipRoutes
);

// Example: logs available to admins and auditors
app.use(
  '/logs',
  requireAuth,
  requireRole('admin', 'auditor'),
  logRoutes
);

app.get('/', (req, res) => {
  res.json({
    message: 'IP Access Control API is running',
    docs: 'Use the Postman collection to interact with the endpoints.'
  });
});


// Error handler
app.use(errorHandler);

module.exports = app;
