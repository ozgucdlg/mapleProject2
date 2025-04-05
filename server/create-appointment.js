const mongoose = require('mongoose');
require('dotenv').config();

// Import models
const Appointment = require('./models/appointmentModel');
const Patient = require('./models/patientModel');
const Doctor = require('./models/doctorModel');
const User = require('./models/userModel');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected successfully');
    return createAppointment();
  })
  .then(() => {
    console.log('Test appointment created successfully');
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  });

async function createAppointment() {
  try {
    // Get a patient
    const patient = await Patient.findOne();
    if (!patient) {
      throw new Error('No patients found in the database');
    }
    console.log('Found patient:', patient._id);

    // Get a doctor (first, get doctor profile)
    const doctorProfile = await Doctor.findOne();
    if (!doctorProfile) {
      throw new Error('No doctors found in the database');
    }
    console.log('Found doctor profile:', doctorProfile._id);

    // Get the doctor user
    const doctorUser = await User.findById(doctorProfile.user);
    if (!doctorUser) {
      throw new Error('Doctor user not found');
    }
    console.log('Found doctor user:', doctorUser._id);

    // Get an admin user for createdBy
    const adminUser = await User.findOne({ role: 'admin' });
    if (!adminUser) {
      throw new Error('No admin users found in the database');
    }
    console.log('Found admin user:', adminUser._id);

    // Create an appointment
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const appointment = new Appointment({
      patient: patient._id,
      doctor: doctorUser._id,
      appointmentDate: tomorrow,
      timeSlot: '09:00 AM',
      status: 'scheduled',
      reason: 'Regular checkup',
      notes: 'First visit',
      createdBy: adminUser._id
    });

    const savedAppointment = await appointment.save();
    console.log('Appointment created:', savedAppointment);
    
    return savedAppointment;
  } catch (error) {
    console.error('Error creating appointment:', error);
    throw error;
  }
} 