const mongoose = require('mongoose');

const AppointmentSchema = mongoose.Schema({
    detail:{
        type: String,
    },
  patient: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'patient'
  },
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'doctor'
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('appointment', AppointmentSchema);