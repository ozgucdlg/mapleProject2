const mongoose = require('mongoose');
require('dotenv').config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(async () => {
    console.log('MongoDB connected successfully');
    
    // Check appointments collection
    console.log('Checking appointments collection:');
    
    // Use raw collection query to check for appointments
    const appointmentsCollection = mongoose.connection.db.collection('appointments');
    
    // Count appointments
    const count = await appointmentsCollection.countDocuments();
    console.log(`Found ${count} appointments in the database`);
    
    // List all appointments
    if (count > 0) {
      console.log('\nListing all appointments:');
      const appointments = await appointmentsCollection.find({}).toArray();
      appointments.forEach((appointment, index) => {
        console.log(`\nAppointment ${index + 1}:`);
        console.log(`ID: ${appointment._id}`);
        console.log(`Patient ID: ${appointment.patient}`);
        console.log(`Doctor ID: ${appointment.doctor}`);
        console.log(`Date: ${new Date(appointment.appointmentDate).toLocaleString()}`);
        console.log(`Time Slot: ${appointment.timeSlot}`);
        console.log(`Status: ${appointment.status}`);
        console.log(`Reason: ${appointment.reason}`);
        console.log(`Notes: ${appointment.notes || 'None'}`);
        console.log(`Created at: ${new Date(appointment.createdAt).toLocaleString()}`);
      });
    }
    
    process.exit(0);
  })
  .catch(err => {
    console.error('Error:', err);
    process.exit(1);
  }); 