require('dotenv').config();
const express = require('express'), mongoose = require('mongoose'), cors = require('cors'), bcrypt = require('bcryptjs');
const User = require('./models/User');
const app = express(); app.use(cors(), express.json());

app.use('/api', require('./routes/auth'));
app.use('/api/summary', require('./routes/summary'));
app.use('/api/announcements', require('./routes/announcements'));
app.use('/api/complaints', require('./routes/complaints'));
app.use('/api/residents', require('./routes/residents'));
app.use('/api/parking', require('./routes/parking'));
app.use('/api/payments', require('./routes/payments'));

mongoose.connect(process.env.MONGO_URI).then(async () => {
  if (!(await User.findOne({ role: 'admin' })))
    await User.create({ name: 'Society Admin', email: 'admin@society.com', password: await bcrypt.hash('admin123', 10), role: 'admin' });
  app.listen(process.env.PORT || 5000, () => console.log('API running on port 5000'));
}).catch(e => console.error('MongoDB connection failed:', e.message));
