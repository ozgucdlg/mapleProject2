const Appointment = require('../models/appointmentModel');
const Patient = require('../models/patientModel');
const User = require('../models/userModel');

// @desc    Get all appointments
// @route   GET /api/appointments
// @access  Private
const getAppointments = async (req, res) => {
  try {
    console.log('Get appointments API called');
    const appointments = await Appointment.find({})
      .populate({
        path: 'patient',
        select: 'firstName lastName dateOfBirth gender contactNumber email'
      })
      .populate({
        path: 'doctor',
        select: 'name email'
      })
      .populate({
        path: 'createdBy',
        select: 'name email'
      });
    
    console.log(`Returning ${appointments.length} appointments`);
    
    // Log the first appointment for debugging
    if (appointments.length > 0) {
      console.log('Sample appointment:', JSON.stringify(appointments[0], null, 2));
    }
    
    res.json(appointments);
  } catch (error) {
    console.error('Get appointments error:', error);
    res.status(500).json({ 
      message: 'Server error while retrieving appointments',
      error: error.message 
    });
  }
};

// @desc    Get appointment by ID
// @route   GET /api/appointments/:id
// @access  Private
const getAppointmentById = async (req, res) => {
  try {
    console.log(`Get appointment by ID called for: ${req.params.id}`);
    const appointment = await Appointment.findById(req.params.id)
      .populate('patient', 'firstName lastName')
      .populate('doctor', 'name')
      .populate('createdBy', 'name');
    
    if (appointment) {
      res.json(appointment);
    } else {
      console.log(`No appointment found with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Get appointment by ID error:', error);
    res.status(500).json({ 
      message: 'Server error while retrieving appointment',
      error: error.message 
    });
  }
};

// @desc    Create a new appointment
// @route   POST /api/appointments
// @access  Private
const createAppointment = async (req, res) => {
  try {
    console.log('Create appointment API called with body:', req.body);
    const { patientId, doctorId, appointmentDate, timeSlot, reason, notes } = req.body;
    
    // Validate required fields
    if (!patientId || !doctorId || !appointmentDate || !timeSlot || !reason) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: patientId, doctorId, appointmentDate, timeSlot, reason' 
      });
    }
    
    // Check if patient exists
    const patientExists = await Patient.findById(patientId);
    if (!patientExists) {
      console.log(`Patient with ID ${patientId} not found`);
      return res.status(400).json({ message: 'Patient not found' });
    }
    
    // Check if doctor exists
    const doctorExists = await User.findById(doctorId);
    if (!doctorExists || doctorExists.role !== 'doctor') {
      console.log(`Doctor with ID ${doctorId} not found`);
      return res.status(400).json({ message: 'Doctor not found' });
    }
    
    // Create appointment
    const appointment = new Appointment({
      patient: patientId,
      doctor: doctorId,
      appointmentDate,
      timeSlot,
      reason,
      notes: notes || '',
      createdBy: req.user._id
    });
    
    const createdAppointment = await appointment.save();
    console.log(`Appointment created successfully: ${createdAppointment._id}`);
    
    // Fetch the populated appointment to return to client
    const populatedAppointment = await Appointment.findById(createdAppointment._id)
      .populate({
        path: 'patient',
        select: 'firstName lastName dateOfBirth gender contactNumber email'
      })
      .populate({
        path: 'doctor',
        select: 'name email'
      })
      .populate({
        path: 'createdBy',
        select: 'name email'
      });
    
    res.status(201).json(populatedAppointment);
  } catch (error) {
    console.error('Create appointment error:', error);
    res.status(500).json({ 
      message: 'Server error while creating appointment',
      error: error.message 
    });
  }
};

// @desc    Update an appointment
// @route   PUT /api/appointments/:id
// @access  Private
const updateAppointment = async (req, res) => {
  try {
    console.log(`Update appointment API called for ID: ${req.params.id}`);
    const appointment = await Appointment.findById(req.params.id);
    
    if (appointment) {
      // Update fields if provided in request body
      appointment.patient = req.body.patientId || appointment.patient;
      appointment.doctor = req.body.doctorId || appointment.doctor;
      appointment.appointmentDate = req.body.appointmentDate || appointment.appointmentDate;
      appointment.timeSlot = req.body.timeSlot || appointment.timeSlot;
      appointment.status = req.body.status || appointment.status;
      appointment.reason = req.body.reason || appointment.reason;
      appointment.notes = req.body.notes !== undefined ? req.body.notes : appointment.notes;
      
      const updatedAppointment = await appointment.save();
      console.log(`Appointment updated successfully: ${updatedAppointment._id}`);
      
      res.json(updatedAppointment);
    } else {
      console.log(`No appointment found with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Update appointment error:', error);
    res.status(500).json({ 
      message: 'Server error while updating appointment',
      error: error.message 
    });
  }
};

// @desc    Delete an appointment
// @route   DELETE /api/appointments/:id
// @access  Private
const deleteAppointment = async (req, res) => {
  try {
    console.log(`Delete appointment API called for ID: ${req.params.id}`);
    const appointment = await Appointment.findById(req.params.id);
    
    if (appointment) {
      await Appointment.deleteOne({ _id: req.params.id });
      console.log(`Appointment deleted successfully: ${req.params.id}`);
      
      res.json({ message: 'Appointment removed' });
    } else {
      console.log(`No appointment found with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Appointment not found' });
    }
  } catch (error) {
    console.error('Delete appointment error:', error);
    res.status(500).json({ 
      message: 'Server error while deleting appointment',
      error: error.message 
    });
  }
};

module.exports = {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
}; 