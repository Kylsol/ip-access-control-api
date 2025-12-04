// Express router for all Service-related endpoints.
// Provides full CRUD operations for the Service model.
const express = require('express');
const router = express.Router();
const { Service } = require('../database/models');


// -------------------------
// GET /services
// Returns a list of all services in the system.
// -------------------------
router.get('/', async (req, res, next) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (err) {
    // Passes error to centralized error handler
    next(err);
  }
});


// -------------------------
// GET /services/:id
// Returns a single service by primary key.
// Useful for inspecting or editing a specific service.
// -------------------------
router.get('/:id', async (req, res, next) => {
  try {
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.json(service);
  } catch (err) {
    next(err);
  }
});


// -------------------------
// POST /services
// Creates a new service.
// 'name' is required and must be unique due to model constraints.
// -------------------------
router.post('/', async (req, res, next) => {
  try {
    const { name, description } = req.body;

    // Basic validation before hitting Sequelize validations
    if (!name) {
      return res.status(400).json({ error: 'Name is required' });
    }

    const newService = await Service.create({ name, description });

    res.status(201).json(newService);
  } catch (err) {
    next(err);
  }
});


// -------------------------
// PUT /services/:id
// Updates an existing service. Only provided fields are updated.
// Good for incremental edits to service metadata.
// -------------------------
router.put('/:id', async (req, res, next) => {
  try {
    const { name, description, active } = req.body;
    const service = await Service.findByPk(req.params.id);

    if (!service) {
      return res.status(404).json({ error: 'Service not found' });
    }

    // Only update fields that are included in the request body
    if (name !== undefined) service.name = name;
    if (description !== undefined) service.description = description;
    if (active !== undefined) service.active = active;

    await service.save();
    res.json(service);
  } catch (err) {
    next(err);
  }
});


// -------------------------
// DELETE /services/:id
// Deletes a service permanently.
// Returns 204 No Content on success.
// -------------------------
router.delete('/:id', async (req, res, next) => {
  try {
    const deleted = await Service.destroy({ where: { id: req.params.id } });

    if (!deleted) {
      return res.status(404).json({ error: 'Service not found' });
    }

    res.status(204).send();
  } catch (err) {
    next(err);
  }
});


// Export router for use in app.js
module.exports = router;
