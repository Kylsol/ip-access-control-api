// app.js
require('dotenv').config();
const express = require('express');
const { sequelize } = require('./database/models');

const logger = require('./middleware/logger');
const errorHandler = require('./middleware/errorHandler');

const userRoutes = require('./routes/users');
const serviceRoutes = require('./routes/services');
const ipRoutes = require('./routes/ipRecords');
const logRoutes = require('./routes/accessLogs');
const authRoutes = require('./routes/auth');

const app = express();

app.use(express.json());
app.use(logger);

app.use('/auth', authRoutes);

app.use('/users', userRoutes);
app.use('/services', serviceRoutes);
app.use('/ips', ipRoutes);
app.use('/logs', logRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.use(errorHandler);

module.exports = { app, sequelize };
