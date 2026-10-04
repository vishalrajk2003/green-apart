const r = require('express').Router();
const Payment = require('../models/Payment'), User = require('../models/User');
const { auth, admin } = require('../middleware/auth');
// Admin sees every bill; a resident sees only their own flat's bills
r.get('/', auth, async (req, res) =>
  res.json(await Payment.find(req.user.role === 'admin' ? {} : { flat: req.user.flat }).sort('-createdAt')));
r.post('/', auth, admin, async (req, res) => res.json(await Payment.create(req.body)));
// Bill every resident that has a flat number for one month
r.post('/generate', auth, admin, async (req, res) => {
  const flats = (await User.find({ role: 'resident', flat: { $ne: '' } })).map(u => u.flat);
  const bills = [...new Set(flats)].map(flat => ({ flat, month: req.body.month, amount: req.body.amount }));
  res.json(await Payment.insertMany(bills));
});
// Marks a bill as paid (add a real gateway like Razorpay here later)
r.put('/:id/pay', auth, async (req, res) => {
  const p = await Payment.findById(req.params.id);
  if (!p) return res.status(404).json({ error: 'Bill not found' });
  if (req.user.role !== 'admin' && p.flat !== req.user.flat) return res.status(403).json({ error: 'Not your bill' });
  p.status = 'Paid'; p.paidOn = new Date(); res.json(await p.save());
});
module.exports = r;
