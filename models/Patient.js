const mongoose = require('mongoose');

const PatientSchema = mongoose.Schema({
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
  details: {
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

module.exports = mongoose.model('patient', PatientSchema);
