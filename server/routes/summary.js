const r = require('express').Router(), { auth } = require('../middleware/auth');
const User = require('../models/User'), Complaint = require('../models/Complaint'), Announcement = require('../models/Announcement');
const Parking = require('../models/Parking'), Payment = require('../models/Payment');
r.get('/', auth, async (req, res) => {
  const mine = req.user.role === 'admin' ? {} : { flat: req.user.flat };
  res.json({
    announcements: await Announcement.countDocuments(),
    complaints: await Complaint.countDocuments({ status: 'Open' }),
    residents: await User.countDocuments({ role: 'resident' }),
    parking: await Parking.countDocuments({ status: 'Free' }),
    payments: await Payment.countDocuments({ ...mine, status: 'Pending' }) });
});
module.exports = r;
