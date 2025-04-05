const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
  try {
    // The connection string will be provided by the environment variable MONGO_URI
    // You'll need to set this in a .env file or via environment variables
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
    
    // Monitor connection events
    mongoose.connection.on('error', err => {
      console.error('MongoDB connection error:', err);
    });
    
    mongoose.connection.on('disconnected', () => {
      console.warn('MongoDB disconnected');
    });
    
    // Handle app termination to properly close the connection
    process.on('SIGINT', () => {
      mongoose.connection.close(() => {
        console.log('MongoDB connection closed due to app termination');
        process.exit(0);
      });
    });
    
  } catch (error) {
    console.error(`MongoDB Connection Error: ${error.message}`);
    console.error(error);
    process.exit(1);
  }
};

module.exports = connectDB; 