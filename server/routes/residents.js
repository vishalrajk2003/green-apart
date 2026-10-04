const r = require('express').Router(), bcrypt = require('bcryptjs');
const User = require('../models/User'); const { auth, admin } = require('../middleware/auth');
r.get('/', auth, async (req, res) => res.json(await User.find({ role: 'resident' }).select('-password')));
r.post('/', auth, admin, async (req, res) => {
  try { res.json(await User.create({ ...req.body, password: await bcrypt.hash('welcome123', 10) })); }
  catch { res.status(400).json({ error: 'That email is already registered' }); } });
module.exports = r;
