const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = "secret";
const auth = require('../middleware/auth');
const {check, validationResult} = require('express-validator');

const Doctor = require('../models/Doctor');

// @route     GET api/authdoctor
// @desc      Get logged in doctor
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.doctor.id).select('-password');
    res.json(doctor);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     POST api/authdoctor
// @desc      Auth doctor & get token
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
      let doctor = await Doctor.findOne({email});

      if (!doctor) {
        return res.status(400).json({msg: 'Invalid Credentials'});
      }

      const isMatch = await bcrypt.compare(password, doctor.password);

      if (!isMatch) {
        return res.status(400).json({msg: 'Invalid Credentials'});
      }

      const payload = {
        doctor: {
          id: doctor.id,
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
