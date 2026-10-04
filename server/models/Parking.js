const mongoose = require('mongoose');
module.exports = mongoose.model('Parking', new mongoose.Schema({
  slotNo: { type: String, unique: true }, type: { type: String, default: 'Car' }, // Car | Bike
  flat: { type: String, default: '' }, vehicleNo: { type: String, default: '' },
  status: { type: String, default: 'Free' } })); // Free | Occupied
