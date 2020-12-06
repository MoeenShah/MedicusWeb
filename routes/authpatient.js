const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = "secret";
const auth = require('../middleware/authp');
const {check, validationResult} = require('express-validator');

const Patient = require('../models/Patient');

// @route     GET api/authpatient
// @desc      Get logged in patient
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const patient = await Patient.findById(req.patient.id).select('-password');
    res.json(patient);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/authpatient
// @desc      Auth patient & get token
// @access    Public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body;

    try {
      let patient = await Patient.findOne({email});

      if (!patient) {
        return res.status(400).json({msg: 'Invalid Credentials'});
      }

      const isMatch = await bcrypt.compare(password, patient.password);

      if (!isMatch) {
        return res.status(400).json({msg: 'Invalid Credentials'});
      }

      const payload = {
        patient: {
          id: patient.id,
        },
      };

      jwt.sign(
        payload,
        config,
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

module.exports = router;
