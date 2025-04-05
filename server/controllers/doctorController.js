const Doctor = require('../models/doctorModel');
const User = require('../models/userModel');

// @desc    Get all doctors
// @route   GET /api/doctors
// @access  Public
const getDoctors = async (req, res) => {
  try {
    console.log('Get doctors API called');
    const doctors = await Doctor.find({})
      .populate('user', 'name email');
    
    res.json(doctors);
  } catch (error) {
    console.error('Get doctors error:', error);
    res.status(500).json({ 
      message: 'Server error while retrieving doctors',
      error: error.message 
    });
  }
};

// @desc    Get doctor by ID
// @route   GET /api/doctors/:id
// @access  Public
const getDoctorById = async (req, res) => {
  try {
    console.log(`Get doctor by ID called for: ${req.params.id}`);
    const doctor = await Doctor.findById(req.params.id)
      .populate('user', 'name email');
    
    if (doctor) {
      res.json(doctor);
    } else {
      console.log(`No doctor found with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Get doctor by ID error:', error);
    res.status(500).json({ 
      message: 'Server error while retrieving doctor',
      error: error.message 
    });
  }
};

// @desc    Create a doctor profile
// @route   POST /api/doctors
// @access  Private/Admin
const createDoctor = async (req, res) => {
  try {
    console.log('Create doctor API called with body:', req.body);
    const { userId, specialty, qualifications, experience, bio, consultationFee, availableDays, availableTimeSlots } = req.body;
    
    // Validate required fields
    if (!userId || !specialty || !qualifications) {
      return res.status(400).json({ 
        message: 'Please provide all required fields: userId, specialty, qualifications' 
      });
    }
    
    // Check if user exists and is a doctor
    const user = await User.findById(userId);
    if (!user) {
      console.log(`User with ID ${userId} not found`);
      return res.status(400).json({ message: 'User not found' });
    }
    
    // Update user role to doctor if not already
    if (user.role !== 'doctor') {
      user.role = 'doctor';
      await user.save();
      console.log(`User ${userId} role updated to doctor`);
    }
    
    // Check if doctor profile already exists
    const doctorExists = await Doctor.findOne({ user: userId });
    if (doctorExists) {
      console.log(`Doctor profile already exists for user ${userId}`);
      return res.status(400).json({ message: 'Doctor profile already exists for this user' });
    }
    
    // Create doctor profile
    const doctor = new Doctor({
      user: userId,
      specialty,
      qualifications,
      experience: experience || 0,
      bio: bio || '',
      consultationFee: consultationFee || 0,
      availableDays: availableDays || [],
      availableTimeSlots: availableTimeSlots || [],
      isAvailable: true
    });
    
    const createdDoctor = await doctor.save();
    console.log(`Doctor profile created successfully: ${createdDoctor._id}`);
    
    res.status(201).json(createdDoctor);
  } catch (error) {
    console.error('Create doctor error:', error);
    res.status(500).json({ 
      message: 'Server error while creating doctor profile',
      error: error.message 
    });
  }
};

// @desc    Update a doctor profile
// @route   PUT /api/doctors/:id
// @access  Private/Admin or Doctor
const updateDoctor = async (req, res) => {
  try {
    console.log(`Update doctor API called for ID: ${req.params.id}`);
    const doctor = await Doctor.findById(req.params.id);
    
    if (doctor) {
      // Update fields if provided in request body
      doctor.specialty = req.body.specialty || doctor.specialty;
      doctor.qualifications = req.body.qualifications || doctor.qualifications;
      doctor.experience = req.body.experience !== undefined ? req.body.experience : doctor.experience;
      doctor.bio = req.body.bio !== undefined ? req.body.bio : doctor.bio;
      doctor.consultationFee = req.body.consultationFee !== undefined ? req.body.consultationFee : doctor.consultationFee;
      doctor.availableDays = req.body.availableDays || doctor.availableDays;
      doctor.availableTimeSlots = req.body.availableTimeSlots || doctor.availableTimeSlots;
      doctor.isAvailable = req.body.isAvailable !== undefined ? req.body.isAvailable : doctor.isAvailable;
      
      const updatedDoctor = await doctor.save();
      console.log(`Doctor profile updated successfully: ${updatedDoctor._id}`);
      
      res.json(updatedDoctor);
    } else {
      console.log(`No doctor found with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Update doctor error:', error);
    res.status(500).json({ 
      message: 'Server error while updating doctor profile',
      error: error.message 
    });
  }
};

// @desc    Delete a doctor profile
// @route   DELETE /api/doctors/:id
// @access  Private/Admin
const deleteDoctor = async (req, res) => {
  try {
    console.log(`Delete doctor API called for ID: ${req.params.id}`);
    const doctor = await Doctor.findById(req.params.id);
    
    if (doctor) {
      await Doctor.deleteOne({ _id: req.params.id });
      console.log(`Doctor profile deleted successfully: ${req.params.id}`);
      
      res.json({ message: 'Doctor profile removed' });
    } else {
      console.log(`No doctor found with ID: ${req.params.id}`);
      res.status(404).json({ message: 'Doctor not found' });
    }
  } catch (error) {
    console.error('Delete doctor error:', error);
    res.status(500).json({ 
      message: 'Server error while deleting doctor profile',
      error: error.message 
    });
  }
};

module.exports = {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
}; 