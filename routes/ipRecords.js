const express = require('express');
const router = express.Router();
const { IpRecord } = require('../database/models');

// -------------------------------------------
// IP Record Routes
// Handles CRUD operations for approved IPs
// Each IP is tied to a user and a service
// -------------------------------------------

// GET /ips - return all IP records
// Useful for viewing all approved IP addresses in the system
router.get('/', async (req, res, next) => {
  try {
    const ips = await IpRecord.findAll();
    res.json(ips);
  } catch (err) {
    next(err); // Pass to global error handler
  }
});

// GET /ips/:id - return a single IP record by primary key
// Provides detailed info for editing or verifying a specific IP
router.get('/:id', async (req, res, next) => {
  try {
    const ip = await IpRecord.findByPk(req.params.id);

    // If IP not found, return a clean 404
    if (!ip) return res.status(404).json({ error: 'IP record not found' });

    res.json(ip);
  } catch (err) {
    next(err);
  }
});

// POST /ips - create a new IP record
// Requires an ipAddress and userId; serviceId is optional
router.post('/', async (req, res, next) => {
  try {
    const { ipAddress, label, userId, serviceId } = req.body;

    // Basic validation to avoid empty inserts
    if (!ipAddress || !userId) {
      return res.status(400).json({ error: 'ipAddress and userId are required' });
    }

    // Create new IP record linked to a user and optionally a service
    const newIp = await IpRecord.create({ ipAddress, label, userId, serviceId });
    res.status(201).json(newIp);
  } catch (err) {
    next(err);
  }
});

// PUT /ips/:id - update an existing IP record
// Only updates fields provided in the request body
router.put('/:id', async (req, res, next) => {
  try {
    const { ipAddress, label, userId, serviceId } = req.body;

    // Fetch the existing record
    const ip = await IpRecord.findByPk(req.params.id);
    if (!ip) return res.status(404).json({ error: 'IP record not found' });

    // Update only the fields included in the request
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

// DELETE /ips/:id - remove an IP record
// Returns 204 No Content if deletion succeeds
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await IpRecord.destroy({ where: { id: req.params.id } });

    // If nothing was deleted, return a clean 404
    if (!deleted) return res.status(404).json({ error: 'IP record not found' });

    res.status(204).send(); // Successful deletion with no body
  } catch (err) {
    next(err);
  }
});

module.exports = router;
