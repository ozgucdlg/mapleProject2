const express = require('express');
const router = express.Router();
const {
  getPatients,
  getPatientById,
  createPatient,
  updatePatient,
  deletePatient,
} = require('../controllers/patientController');

// GET all patients and POST a new patient
router.route('/').get(getPatients).post(createPatient);

// GET, PUT, DELETE a patient by ID
router.route('/:id').get(getPatientById).put(updatePatient).delete(deletePatient);

module.exports = router; 