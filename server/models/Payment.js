const mongoose = require('mongoose');
module.exports = mongoose.model('Payment', new mongoose.Schema({
  flat: String, month: String, amount: Number,
  status: { type: String, default: 'Pending' }, paidOn: Date }, { timestamps: true })); // Pending | Paid
