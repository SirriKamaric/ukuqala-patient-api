const jwt = require('jsonwebtoken');
require('dotenv').config();

const protect = (req, res, next) => { // Renamed to 'protect' to match your routes
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // This allows vitalsController to access req.user.id
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

// Export as an object so { protect } works in your routes
module.exports = { protect };