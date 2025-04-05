const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    
    // Create a test document
    const testSchema = new mongoose.Schema({
      name: String,
      date: { type: Date, default: Date.now }
    });
    
    const Test = mongoose.model('Test', testSchema);
    
    // Create and save a test document
    const testDoc = new Test({ name: 'Test Document' });
    return testDoc.save();
  })
  .then(doc => {
    console.log('Test document created successfully:', doc);
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  }); 