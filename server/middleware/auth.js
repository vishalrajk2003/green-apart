const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'dev-secret';
const auth = (req, res, next) => {
  try { req.user = jwt.verify((req.headers.authorization || '').split(' ')[1], SECRET); next(); }
  catch { res.status(401).json({ error: 'Please log in again' }); } };
const admin = (req, res, next) =>
  req.user.role === 'admin' ? next() : res.status(403).json({ error: 'Only the admin can do this' });
module.exports = { SECRET, auth, admin };
