const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Patient'
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    appointmentDate: {
      type: Date,
      required: true
    },
    timeSlot: {
      type: String,
      required: true
    },
    status: {
      type: String,
      required: true,
      enum: ['scheduled', 'completed', 'cancelled'],
      default: 'scheduled'
    },
    reason: {
      type: String,
      required: true
    },
    notes: {
      type: String
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    }
  },
  {
    timestamps: true
  }
);

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment; 