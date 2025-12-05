// Express router for handling all User-related endpoints
const express = require('express');
const router = express.Router();

// Import User model to interact with the users table
const { User } = require('../database/models');

// Auth middleware: verifies JWT and attaches req.user
const { requireAuth } = require('../middleware/auth');


// ---------------------------------------------
// GET /users - Retrieve all users (auth required)
// ---------------------------------------------
router.get('/', requireAuth, async (req, res, next) => {
  try {
    // Fetch all users from the database (do not include passwordHash)
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'role']
    });
    res.json(users);
  } catch (err) {
    // Forward errors to centralized error handler
    next(err);
  }
});


// ---------------------------------------------
// GET /users/:id - Retrieve a single user by ID (auth required)
// ---------------------------------------------
router.get('/:id', requireAuth, async (req, res, next) => {
  try {
    // Find user by primary key
    const user = await User.findByPk(req.params.id, {
      attributes: ['id', 'name', 'email', 'role']
    });

    // Return 404 if user does not exist
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json(user);
  } catch (err) {
    next(err);
  }
});


// ---------------------------------------------
// POST /users - Create a new user (auth required for now)
// NOTE: In practice, public registration should use /auth/register.
// This route is more for admin-created users and expects a passwordHash.
// ---------------------------------------------
router.post('/', requireAuth, async (req, res, next) => {
  try {
    const { name, email, role, passwordHash } = req.body;

    // Basic validation to ensure required fields exist
    if (!name || !email || !passwordHash) {
      return res
        .status(400)
        .json({ error: 'Name, email, and passwordHash are required' });
    }

    // Check for existing email
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ error: 'Email is already in use' });
    }

    // Create a new user record
    const newUser = await User.create({ name, email, role, passwordHash });

    // Respond with 201 to indicate successful creation (hide passwordHash)
    res.status(201).json({
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });
  } catch (err) {
    next(err);
  }
});


// ---------------------------------------------
// PUT /users/:id - Update an existing user (auth required)
// ---------------------------------------------
router.put('/:id', requireAuth, async (req, res, next) => {
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

    // Return updated user without passwordHash
    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    next(err);
  }
});


// ---------------------------------------------
// DELETE /users/:id - Remove a user permanently (auth required)
// ---------------------------------------------
router.delete('/:id', requireAuth, async (req, res, next) => {
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
