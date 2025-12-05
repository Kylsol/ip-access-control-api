// middleware/auth.js
const jwt = require('jsonwebtoken');

const tokenBlacklist = new Set(); // simple in-memory blacklist for logout demo

function extractToken(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.substring(7);
}

// Require any authenticated user
function requireAuth(req, res, next) {
  const token = extractToken(req);
  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  if (tokenBlacklist.has(token)) {
    return res.status(401).json({ error: 'Token has been logged out' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the minimal user info you need for RBAC/ownership checks
    req.user = {
      id: decoded.id,
      email: decoded.email,
      role: decoded.role,
    };

    next();
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired, please log in again' });
    }
    return res.status(401).json({ error: 'Invalid token' });
  }
}

// Role-based middleware
function requireRole(...allowedRoles) {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({ error: 'Forbidden: insufficient permissions' });
    }

    next();
  };
}

// Logout helper
function logout(req, res) {
  const token = extractToken(req);
  if (!token) {
    return res.status(400).json({ error: 'No token provided' });
  }

  tokenBlacklist.add(token);
  return res.status(200).json({ message: 'Logged out successfully' });
}

module.exports = {
  requireAuth,
  requireRole,
  logout,
};
