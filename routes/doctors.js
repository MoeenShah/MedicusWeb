const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const Admin = require('../models/Admin');
const Doctor = require('../models/Doctor');

// @route     GET api/doctors
// @desc      Get all doctors
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const doctors = await Doctor.find().sort({
      date: -1,
    });
    res.json(doctors);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/doctors/searchdoctor
// @desc      Search Doctors, mobile application
// @access    Private
router.post(
  '/searchdoctor',
  [
    auth,
    [
      check('query', 'Query text is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const doctors = await Doctor.find().sort({
        date: -1,
      });

      return res.json(doctors);
    }
    const {query} = req.body;
    try {
      // let doctors = await Doctor.find();
      // if (!doctors) {
      //   return res.status(400).json({msg: 'No doctor exists'});
      // }
      // else{
       Doctor.find({name: new RegExp(query, 'i')}, function(err, doc) {
          return res.json(doc);
        });
        // salman bhai
        // doctors.filter(async doctor => {
        //   const regex = new RegExp('^'+query+'$', "i");
        //   const result = doctor.name.match(regex) || doctor.domain.match(regex);
        //   let doctors2 = await Doctor.find({name : result}).sort({
        //     date: -1,
        //   });
    
        //   return res.json(doctors2);
        // })
      // }
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);


// @route     POST api/doctors
// @desc      Add new doctor
// @access    Private
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required')
        .not()
        .isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {name, email, password, phone, domain, type} = req.body;

    try {
      let doctor = await Doctor.findOne({email});

      if (doctor) {
        return res.status(400).json({msg: 'User already exists'});
      }

      const newDoctor = new Doctor({
        name,
        email,
        phone,
        type,
        password,
        domain,
      });
      const salt = await bcrypt.genSalt(10);

      newDoctor.password = await bcrypt.hash(password, salt);

      const ndoctor = await newDoctor.save();

      // const payload = {
      //   doctor: {
      //     id: doctor.id,
      //   },
      // };

      // jwt.sign(
      //   payload,
      //   config.get('jwtSecret'),
      //   {
      //     // expiresIn: 360000,
      //   },
      //   (err, token) => {
      //     if (err) throw err;
      //     res.json({token});
      //   },
      // );
      res.json(ndoctor);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

// @route     PUT api/doctors/:id
// @desc      Update doctor
// @access    Private
router.put('/:id', auth, async (req, res) => {
  const {name, email, phone, type, domain} = req.body;

  // Build doctor object
  const doctorFields = {};
  if (name) doctorFields.name = name;
  if (email) doctorFields.email = email;
  if (phone) doctorFields.phone = phone;
  if (type) doctorFields.type = type;
  if (domain) doctorFields.domain = domain;

  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).json({msg: 'Doctor not found'});

    // Make sure admin owns doctor
    // if (doctor.admin.toString() !== req.admin.id) {
    //   return res.status(401).json({msg: 'Not authorized'});
    // }

    doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      {$set: doctorFields},
      {new: true},
    );

    res.json(doctor);
  } catch (err) {
    console.error(er.message);
    res.status(500).send('Server Error');
  }
});

// @route     DELETE api/doctors/:id
// @desc      Delete doctor
// @access    Private
router.delete('/:id', auth, async (req, res) => {
  try {
    let doctor = await Doctor.findById(req.params.id);

    if (!doctor) return res.status(404).json({msg: 'Doctor not found'});

    // Make sure admin owns doctor
    // if (doctor.admin.toString() !== req.admin.id) {
    //   return res.status(401).json({msg: 'Not authorized'});
    // }

    await Doctor.findByIdAndRemove(req.params.id);

    res.json({msg: 'Doctor removed'});
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
