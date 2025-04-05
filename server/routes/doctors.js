const express = require('express');
const router = express.Router();
const {
  getDoctors,
  getDoctorById,
  createDoctor,
  updateDoctor,
  deleteDoctor
} = require('../controllers/doctorController');
const { protect, admin } = require('../middleware/authMiddleware');

// Public routes
router.get('/', getDoctors);
router.get('/:id', getDoctorById);

// Protected routes
router.post('/', protect, admin, createDoctor);
router.put('/:id', protect, updateDoctor);
router.delete('/:id', protect, admin, deleteDoctor);

module.exports = router; 