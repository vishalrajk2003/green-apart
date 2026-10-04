const r = require('express').Router();
const Parking = require('../models/Parking'); const { auth, admin } = require('../middleware/auth');
r.get('/', auth, async (req, res) => res.json(await Parking.find().sort('slotNo')));
r.post('/', auth, admin, async (req, res) => {
  try { res.json(await Parking.create({ slotNo: req.body.slotNo, type: req.body.type })); }
  catch { res.status(400).json({ error: 'That slot number already exists' }); } });
r.put('/:id/assign', auth, admin, async (req, res) =>
  res.json(await Parking.findByIdAndUpdate(req.params.id,
    { flat: req.body.flat, vehicleNo: req.body.vehicleNo, status: 'Occupied' }, { new: true })));
r.put('/:id/release', auth, admin, async (req, res) =>
  res.json(await Parking.findByIdAndUpdate(req.params.id, { flat: '', vehicleNo: '', status: 'Free' }, { new: true })));
r.delete('/:id', auth, admin, async (req, res) => { await Parking.findByIdAndDelete(req.params.id); res.json({ ok: true }); });
module.exports = r;
