const express = require('express');
const router = express.Router();
const { AccessLog } = require('../database/models');

// GET all access logs
router.get('/', async (req, res, next) => {
  try {
    const logs = await AccessLog.findAll();
    res.json(logs);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
