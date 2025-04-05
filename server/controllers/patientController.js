const Patient = require('../models/patientModel');

// @desc    Get all patients
// @route   GET /api/patients
// @access  Public
const getPatients = async (req, res) => {
  try {
    const patients = await Patient.find({});
    res.json(patients);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a patient by ID
// @route   GET /api/patients/:id
// @access  Public
const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (patient) {
      res.json(patient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Create a patient
// @route   POST /api/patients
// @access  Public
const createPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    const createdPatient = await patient.save();
    res.status(201).json(createdPatient);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Update a patient
// @route   PUT /api/patients/:id
// @access  Public
const updatePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (patient) {
      Object.assign(patient, req.body);
      const updatedPatient = await patient.save();
      res.json(updatedPatient);
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// @desc    Delete a patient
// @route   DELETE /api/patients/:id
// @access  Public
const deletePatient = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    
    if (patient) {
      await Patient.deleteOne({ _id: req.params.id });
      res.json({ message: 'Patient removed' });
    } else {
      res.status(404).json({ message: 'Patient not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
}; 