// Simple request logger middleware.
// This runs on every incoming request and prints the HTTP method and URL.
// Useful for debugging during development and tracking API activity.
function logger(req, res, next) {
    console.log(`${req.method} ${req.url}`);
    next(); // Pass control to the next middleware or route handler
  }
  
  module.exports = logger;
  