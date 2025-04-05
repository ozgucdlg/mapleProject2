const jwt = require('jsonwebtoken');

// Generate a JWT token with user ID as payload
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

module.exports = generateToken; 