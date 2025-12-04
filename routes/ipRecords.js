const express = require('express');
const router = express.Router();
const { IpRecord } = require('../database/models');

// GET all IP records
router.get('/', async (req, res, next) => {
  try {
    const ips = await IpRecord.findAll();
    res.json(ips);
  } catch (err) {
    next(err);
  }
});

// GET IP record by id
router.get('/:id', async (req, res, next) => {
  try {
    const ip = await IpRecord.findByPk(req.params.id);
    if (!ip) return res.status(404).json({ error: 'IP record not found' });
    res.json(ip);
  } catch (err) {
    next(err);
  }
});

// POST create IP record
router.post('/', async (req, res, next) => {
  try {
    const { ipAddress, label, userId, serviceId } = req.body;

    if (!ipAddress || !userId) {
      return res.status(400).json({ error: 'ipAddress and userId are required' });
    }

    const newIp = await IpRecord.create({ ipAddress, label, userId, serviceId });
    res.status(201).json(newIp);
  } catch (err) {
    next(err);
  }
});

// PUT update IP record
router.put('/:id', async (req, res, next) => {
  try {
    const { ipAddress, label, userId, serviceId } = req.body;
    const ip = await IpRecord.findByPk(req.params.id);

    if (!ip) return res.status(404).json({ error: 'IP record not found' });

    if (ipAddress !== undefined) ip.ipAddress = ipAddress;
    if (label !== undefined) ip.label = label;
    if (userId !== undefined) ip.userId = userId;
    if (serviceId !== undefined) ip.serviceId = serviceId;

    await ip.save();
    res.json(ip);
  } catch (err) {
    next(err);
  }
});

// DELETE IP record
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await IpRecord.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'IP record not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
