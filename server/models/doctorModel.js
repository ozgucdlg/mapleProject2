const mongoose = require('mongoose');

const doctorSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    specialty: {
      type: String,
      required: true
    },
    qualifications: {
      type: String,
      required: true
    },
    experience: {
      type: Number,
      required: true,
      default: 0
    },
    bio: {
      type: String
    },
    consultationFee: {
      type: Number,
      required: true,
      default: 0
    },
    availableDays: [{
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    }],
    availableTimeSlots: [{
      type: String
    }],
    isAvailable: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true
  }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor; 