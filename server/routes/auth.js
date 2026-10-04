const r = require('express').Router(), bcrypt = require('bcryptjs'), jwt = require('jsonwebtoken');
const User = require('../models/User'); const { SECRET } = require('../middleware/auth');
r.post('/login', async (req, res) => {
  const u = await User.findOne({ email: req.body.email });
  if (!u || !(await bcrypt.compare(req.body.password || '', u.password)))
    return res.status(400).json({ error: 'Wrong email or password' });
  const token = jwt.sign({ id: u._id, name: u.name, role: u.role, flat: u.flat }, SECRET, { expiresIn: '1d' });
  res.json({ token, user: { name: u.name, role: u.role, flat: u.flat } });
});
module.exports = r;
