const express = require('express');
const router = express.Router();
const bookingController = require('../controllers/bookingController');
const { authenticate } = require('../middleware/auth');

// Test endpoint without auth
router.get('/test', (req, res) => {
    res.json({ success: true, message: 'Bookings endpoint is working' });
});

// Create a new booking
router.post('/', authenticate, bookingController.createBooking);

// Get all bookings for a user
router.get('/', authenticate, bookingController.getUserBookings);

// Get a specific booking by ID
router.get('/:id', authenticate, bookingController.getBookingById);

// Update a booking by ID
router.put('/:id', authenticate, bookingController.updateBooking);

// Delete a booking by ID
router.delete('/:id', authenticate, bookingController.deleteBooking);

module.exports = router;