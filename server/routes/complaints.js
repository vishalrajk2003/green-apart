const r = require('express').Router();
const Complaint = require('../models/Complaint'); const { auth, admin } = require('../middleware/auth');
r.get('/', auth, async (req, res) => res.json(await Complaint.find().sort('-createdAt')));
r.post('/', auth, async (req, res) => res.json(await Complaint.create(req.body)));
r.put('/:id/resolve', auth, admin, async (req, res) =>
  res.json(await Complaint.findByIdAndUpdate(req.params.id, { status: 'Resolved' }, { new: true })));
module.exports = r;
