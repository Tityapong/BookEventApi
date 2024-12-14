const jwt = require('jsonwebtoken');
const SECRET_KEY = process.env.SECRET_KEY;

// Middleware for role-based access
const authorize = (roles) => (req, res, next) => {
  const token = req.headers['authorization'];
  if (!token) return res.status(403).json({ message: 'Token is required' });

  try {
    const decoded = jwt.verify(token, SECRET_KEY);
    req.user = decoded;

    // Check if user's role is allowed
    if (!roles.includes(decoded.role)) {
      return res.status(403).json({ message: 'Access denied' });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
};

module.exports = { authorize };
