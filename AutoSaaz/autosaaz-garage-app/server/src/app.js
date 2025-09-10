const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const sequelize = require('./config/database');
const authRoutes = require('./routes/auth');
const bookingRoutes = require('./routes/bookings');
const userRoutes = require('./routes/users');
const appointmentRoutes = require('./routes/appointments');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
sequelize.authenticate()
  .then(() => {
    console.log('PostgreSQL connected successfully');
    // Don't sync/alter tables - they're already set up via SQL script
    return Promise.resolve();
  })
  .then(() => {
    console.log('Database connection established');
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes);
app.use('/api/appointments', appointmentRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
