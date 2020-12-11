const mongoose = require('mongoose');

const DoctorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: 'Silver'
  },
  domain: {
    type: String,
  },
  bank: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'bank'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('doctor', DoctorSchema);
