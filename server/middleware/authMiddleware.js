const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

// Middleware to protect routes
const protect = async (req, res, next) => {
  let token;

  console.log('Auth middleware checking token');
  console.log('Authorization header:', req.headers.authorization);

  // Check if token exists in the Authorization header
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Get token from header
      token = req.headers.authorization.split(' ')[1];
      console.log('Token found:', token ? 'yes' : 'no');

      if (!token) {
        console.log('Token is empty');
        return res.status(401).json({ message: 'Not authorized, token is empty' });
      }

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded);

      // Get user from the token
      const user = await User.findById(decoded.id).select('-password');
      
      if (!user) {
        console.log('User not found for token');
        return res.status(401).json({ message: 'User not found for this token' });
      }

      console.log('User authenticated:', user._id);
      req.user = user;
      next();
    } catch (error) {
      console.error('Token verification error:', error);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).json({ message: 'Invalid token' });
      } else if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Token expired' });
      } else {
        return res.status(401).json({ message: 'Not authorized, token failed' });
      }
    }
  } else {
    console.log('No Authorization header or not Bearer format');
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

// Middleware to check if user is admin
const admin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    console.log('Admin access granted for user:', req.user._id);
    next();
  } else {
    console.log('Admin access denied for user:', req.user?._id);
    res.status(401).json({ message: 'Not authorized as an admin' });
  }
};

module.exports = { protect, admin }; 