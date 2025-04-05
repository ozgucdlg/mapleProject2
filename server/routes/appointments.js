const express = require('express');
const router = express.Router();
const {
  getAppointments,
  getAppointmentById,
  createAppointment,
  updateAppointment,
  deleteAppointment
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

// All appointment routes are protected
router.use(protect);

// GET all appointments and POST a new appointment
router.route('/').get(getAppointments).post(createAppointment);

// GET, PUT, DELETE an appointment by ID
router.route('/:id')
  .get(getAppointmentById)
  .put(updateAppointment)
  .delete(deleteAppointment);

module.exports = router; 