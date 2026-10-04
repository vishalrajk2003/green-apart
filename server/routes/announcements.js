const r = require('express').Router();
const Announcement = require('../models/Announcement'); const { auth, admin } = require('../middleware/auth');
const rank = { Urgent: 0, Important: 1, Normal: 2 };
r.get('/', auth, async (req, res) => {
  const list = await Announcement.find().sort('-createdAt');
  res.json(list.sort((a, b) => rank[a.priority] - rank[b.priority])); // urgent first
});
r.post('/', auth, admin, async (req, res) => res.json(await Announcement.create(req.body)));
r.delete('/:id', auth, admin, async (req, res) => { await Announcement.findByIdAndDelete(req.params.id); res.json({ ok: true }); });
module.exports = r;
