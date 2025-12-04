// Express router for handling all User-related endpoints
const express = require('express');
const router = express.Router();

// Import User model to interact with the users table
const { User } = require('../database/models');


// ---------------------------------------------
// GET /users - Retrieve all users
// ---------------------------------------------
router.get('/', async (req, res, next) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll();
    res.json(users);
  } catch (err) {
    // Forward errors to centralized error handler
    next(err);
  }
});


// ---------------------------------------------
// GET /users/:id - Retrieve a single user by ID
// ---------------------------------------------
router.get('/:id', async (req, res, next) => {
  try {
    // Find user by primary key
    const user = await User.findByPk(req.params.id);

    // Return 404 if user does not exist
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});


// ---------------------------------------------
// POST /users - Create a new user
// ---------------------------------------------
router.post('/', async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    // Basic validation to ensure required fields exist
    if (!name || !email) {
      return res.status(400).json({ error: 'Name and email are required' });
    }

    // Create a new user record
    const newUser = await User.create({ name, email, role });

    // Respond with 201 to indicate successful creation
    res.status(201).json(newUser);
  } catch (err) {
    next(err);
  }
});


// ---------------------------------------------
// PUT /users/:id - Update an existing user
// ---------------------------------------------
router.put('/:id', async (req, res, next) => {
  try {
    const { name, email, role } = req.body;

    // Look up the existing user
    const user = await User.findByPk(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Update only provided fields; leave others unchanged
    user.name = name ?? user.name;
    user.email = email ?? user.email;
    user.role = role ?? user.role;

    // Save updated user to database
    await user.save();
    res.json(user);
  } catch (err) {
    next(err);
  }
});


// ---------------------------------------------
// DELETE /users/:id - Remove a user permanently
// ---------------------------------------------
router.delete('/:id', async (req, res, next) => {
  try {
    // destroy() returns number of rows deleted
    const deleted = await User.destroy({ where: { id: req.params.id } });

    // If no rows deleted, the user didn't exist
    if (!deleted) return res.status(404).json({ error: 'User not found' });

    // 204 means "success, but no content to return"
    res.status(204).send();
  } catch (err) {
    next(err);
  }
});

// Export router so it can be mounted in app.js
module.exports = router;
