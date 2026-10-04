const mongoose = require('mongoose');
module.exports = mongoose.model('User', new mongoose.Schema({
  name: String, email: { type: String, unique: true }, password: String,
  flat: String, phone: String, role: { type: String, default: 'resident' } }));
