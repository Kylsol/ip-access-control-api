const express = require('express');
const router = express.Router();
const { Service } = require('../database/models');

// GET all services
router.get('/', async (req, res, next) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    next(err);
  }
});

// GET service by id
router.get('/:id', async (req, res, next) => {
  try {
    const service = await Service.findByPk(req.params.id);
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    next(err);
  }
});

// POST create service
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newService = await Service.create({ name, description });
    res.status(201).json(newService);
  } catch (err) {
    next(err);
  }
});

// PUT update service
router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, active } = req.body;
    const service = await Service.findByPk(req.params.id);

    if (!service) return res.status(404).json({ error: 'Service not found' });

    if (name !== undefined) service.name = name;
    if (description !== undefined) service.description = description;
    if (active !== undefined) service.active = active;

    await service.save();
    res.json(service);
  } catch (err) {
    next(err);
  }
});

// DELETE service
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Service.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ error: 'Service not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

module.exports = router;
