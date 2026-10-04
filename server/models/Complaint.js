const mongoose = require('mongoose');
module.exports = mongoose.model('Complaint', new mongoose.Schema({
  title: String, message: String, flat: String, status: { type: String, default: 'Open' } }, { timestamps: true }));
