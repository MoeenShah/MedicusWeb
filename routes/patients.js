const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

// const Patient = require('../models/Patient');
const Patient = require('../models/Patient');


// @route     POST api/users
// @desc      Regiter a patient
// @access    Public
router.post(
  '/',
  [
    check('name', 'Please add name')
      .not()
      .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters',
    ).isLength({min: 6}),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password} = req.body;

    try {
      let patient = await Patient.findOne({email});

      if (patient) {
        return res.status(400).json({msg: 'Patient already exists'});
      }

      patient = new Patient({
        name,
        email,
        password,
      });

      const salt = await bcrypt.genSalt(10);

      patient.password = await bcrypt.hash(password, salt);

      await patient.save();

      const payload = {
        patient: {
          id: patient.id,
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        {
          // expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.json({token});
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);



// @route     GET api/patients
// @desc      Get all patients
// @access    Private
// router.get('/', auth, async (req, res) => {
//   try {
//     const patients = await Patient.find().sort({
//       date: -1,
//     });
//     res.json(patients);
//   } catch (err) {
//     console.error(err.message);
//     res.status(500).send('Server Error');
//   }
// });

// @route     POST api/patients
// @desc      Add new patient
// @access    Private
// router.post(
//   '/',
//   [
//     auth,
//     [
//       check('name', 'Name is required')
//         .not()
//         .isEmpty(),
//     ],
//   ],
//   async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.status(400).json({errors: errors.array()});
//     }

//     const {name, email, phone, details} = req.body;

//     try {
//       const newContact = new Patient({
//         name,
//         email,
//         phone,
//         details,
//         patient: req.patient.id,
//       });

//       const patient = await newContact.save();

//       res.json(patient);
//     } catch (err) {
//       console.error(err.message);
//       res.status(500).send('Server Error');
//     }
//   },
// );

// @route     PUT api/patients/:id
// @desc      Update patient
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {name, email, phone, details} = req.body;

  // Build patient object
  const patientFields = {};
  if (name) patientFields.name = name;
  if (email) patientFields.email = email;
  if (phone) patientFields.phone = phone;
  if (details) patientFields.details = details;

  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) return res.status(404).json({msg: 'Patient not found'});

    // Make sure patient owns patient
    // if (patient.patient.toString() !== req.patient.id) {
    //   return res.status(401).json({msg: 'Not authorized'});
    // }

    patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {$set: patientFields},
      {new: true},
    );

    res.json(patient);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/patients/:id
// @desc      Delete patient
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let patient = await Patient.findById(req.params.id);

    if (!patient) return res.status(404).json({msg: 'Patient not found'});

    // Make sure patient owns patient
    // if (patient.patient.toString() !== req.patient.id) {
    //   return res.status(401).json({msg: 'Not authorized'});
    // }

    await Patient.findByIdAndRemove(req.params.id);

    res.json({msg: 'Patient removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
