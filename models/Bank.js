const mongoose = require('mongoose');

const BankSchema = mongoose.Schema({
  cardnumber: {
    type: String,
    // required: true
  },
  expirydate: {
    type: String,
    // required: true
  },
  cardcode: {
    type: String,
    // required: true
  }
});

module.exports = mongoose.model('bank', BankSchema);
