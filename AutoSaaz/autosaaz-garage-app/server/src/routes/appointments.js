const express = require('express');
const appointmentController = require('../controllers/appointmentController');
const auth = require('../middleware/auth');
const router = express.Router();

// Get all appointments
router.get('/', auth, appointmentController.getAppointments);

// Get specific appointment
router.get('/:id', auth, appointmentController.getAppointmentById);

// Accept appointment
router.put('/:id/accept', auth, appointmentController.acceptAppointment);

// Cancel appointment
router.put('/:id/cancel', auth, appointmentController.cancelAppointment);

// Create appointment (for testing)
router.post('/', auth, appointmentController.createAppointment);

module.exports = router;
