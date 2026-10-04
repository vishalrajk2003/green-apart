const mongoose = require('mongoose');
module.exports = mongoose.model('Announcement', new mongoose.Schema({
  title: String, message: String,
  priority: { type: String, enum: ['Normal', 'Important', 'Urgent'], default: 'Normal' } }, { timestamps: true }));
