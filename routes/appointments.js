const express = require('express');
const router = express.Router();
const auth = require('../middleware/authp');
const {check, validationResult} = require('express-validator');

const Patient = require('../models/Patient');
const Appointment = require('../models/Appointment');

// @route     GET api/appointments
// @desc      Get all users appointments
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const appointments = await Appointment.find({patient: req.patient.id}).sort({
      date: -1,
    });
    res.json(appointments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/appointments
// @desc      Add new appointment
// @access    Private
router.post(
  '/',
  [
    auth,
    // [
    //   check('details', 'Details is required')
    //     .not()
    //     .isEmpty(),
    // ],
  ],
  async (req, res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //   return res.status(400).json({errors: errors.array()});
    // }

    const {detail, doctor} = req.body;

    try {
      const newAppointment = new Appointment({
        doctor,
        detail,
        patient: req.patient.id
      });

      const appointment = await newAppointment.save();

      res.json(appointment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/appointments/:id
// @desc      Update appointment
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {details} = req.body;

  // Build appointment object
  const appointmentFields = {};
  if (details) appointmentFields.details = details;

  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({msg: 'Appointment not found'});

    // Make sure patient owns appointment
    if (appointment.patient.toString() !== req.patient.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    appointment = await Appointment.findByIdAndUpdate(
      req.params.id,
      {$set: appointmentFields},
      {new: true},
    );

    res.json(appointment);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/appointments/:id
// @desc      Delete appointment
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let appointment = await Appointment.findById(req.params.id);

    if (!appointment) return res.status(404).json({msg: 'Appointment not found'});

    // Make sure patient owns appointment
    if (appointment.patient.toString() !== req.patient.id) {
      return res.status(401).json({msg: 'Not authorized'});
    }

    await Appointment.findByIdAndRemove(req.params.id);

    res.json({msg: 'Appointment removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
