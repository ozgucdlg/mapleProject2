const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// Import models
const User = require('./models/userModel');
const Doctor = require('./models/doctorModel');
const Patient = require('./models/patientModel');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    return setup();
  })
  .then(() => {
    console.log('Test data created successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });

async function setup() {
  // Create timestamp for unique emails
  const timestamp = Date.now();
  
  // Create a test user
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash('password123', salt);
  
  const testUser = new User({
    name: 'Test User',
    email: `test${timestamp}@example.com`,
    password: hashedPassword,
    role: 'admin'
  });
  
  const user = await testUser.save();
  console.log('Test user created:', user);
  
  // Create a test doctor
  const doctorUser = new User({
    name: 'Dr. John Doe',
    email: `doctor${timestamp}@example.com`,
    password: hashedPassword,
    role: 'doctor'
  });
  
  const doctor = await doctorUser.save();
  console.log('Doctor user created:', doctor);
  
  const doctorProfile = new Doctor({
    user: doctor._id,
    specialty: 'Cardiology',
    qualifications: 'MD, PhD',
    experience: 10,
    bio: 'Experienced cardiologist with 10 years of practice.',
    consultationFee: 150,
    availableDays: ['Monday', 'Wednesday', 'Friday'],
    availableTimeSlots: ['09:00 AM', '11:00 AM', '02:00 PM'],
    isAvailable: true
  });
  
  const doctorRecord = await doctorProfile.save();
  console.log('Doctor profile created:', doctorRecord);
  
  // Create a test patient (updated to match schema)
  const patient = new Patient({
    firstName: 'Jane',
    lastName: 'Smith',
    dateOfBirth: new Date('1990-05-15'),
    gender: 'Female', // Capitalized to match enum
    contactNumber: '1234567890', // Required field
    email: `patient${timestamp}@example.com`,
    address: {
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zipCode: '12345',
      country: 'USA'
    },
    bloodType: 'O+',
    medicalHistory: [
      {
        condition: 'Allergies',
        diagnosedDate: new Date('2010-01-15'),
        notes: 'Seasonal allergies'
      }
    ],
    emergencyContact: {
      name: 'John Smith',
      relationship: 'Spouse',
      contactNumber: '0987654321'
    }
  });
  
  const patientRecord = await patient.save();
  console.log('Patient created:', patientRecord);
  
  return { user, doctor, doctorRecord, patientRecord };
} 