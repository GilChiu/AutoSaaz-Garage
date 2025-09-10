const Booking = require('../models/Booking');
const User = require('../models/User');
const Business = require('../models/Business');

// Create a new booking
exports.createBooking = async (req, res) => {
    try {
        const {
            customerName,
            customerEmail,
            customerPhone,
            vehicleMake,
            vehicleModel,
            vehicleYear,
            serviceType,
            appointmentDate,
            priority,
            notes
        } = req.body;

        const userId = req.user.id;

        // Get user's business
        const business = await Business.findOne({ where: { userId } });
        if (!business) {
            return res.status(404).json({ 
                success: false, 
                message: 'Business not found' 
            });
        }

        const newBooking = await Booking.create({
            userId,
            businessId: business.id,
            customerName,
            customerEmail,
            customerPhone,
            vehicleMake,
            vehicleModel,
            vehicleYear,
            serviceType,
            appointmentDate,
            priority: priority || 'medium',
            notes,
            status: 'pending'
        });

        res.status(201).json({ 
            success: true,
            message: 'Booking created successfully', 
            data: newBooking 
        });
    } catch (error) {
        console.error('Create booking error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error creating booking', 
            error: error.message 
        });
    }
};

// Get all bookings for a user
exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user.id;

        // Get user's business
        const business = await Business.findOne({ where: { userId } });
        if (!business) {
            return res.status(404).json({ 
                success: false, 
                message: 'Business not found' 
            });
        }

        const bookings = await Booking.findAll({
            where: { businessId: business.id },
            order: [['appointmentDate', 'ASC']],
            include: [
                {
                    model: User,
                    as: 'customer',
                    attributes: ['id', 'email', 'firstName', 'lastName']
                }
            ]
        });

        res.status(200).json({
            success: true,
            data: bookings
        });
    } catch (error) {
        console.error('Get bookings error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching bookings', 
            error: error.message 
        });
    }
};

// Get a specific booking by ID
exports.getBookingById = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Get user's business
        const business = await Business.findOne({ where: { userId } });
        if (!business) {
            return res.status(404).json({ 
                success: false, 
                message: 'Business not found' 
            });
        }

        const booking = await Booking.findOne({
            where: { 
                id,
                businessId: business.id
            },
            include: [
                {
                    model: User,
                    as: 'customer',
                    attributes: ['id', 'email', 'firstName', 'lastName']
                }
            ]
        });

        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found' 
            });
        }

        res.status(200).json({
            success: true,
            data: booking
        });
    } catch (error) {
        console.error('Get booking error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching booking', 
            error: error.message 
        });
    }
};

// Update a booking
exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Get user's business
        const business = await Business.findOne({ where: { userId } });
        if (!business) {
            return res.status(404).json({ 
                success: false, 
                message: 'Business not found' 
            });
        }

        const booking = await Booking.findOne({
            where: { 
                id,
                businessId: business.id
            }
        });

        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found' 
            });
        }

        const updatedBooking = await booking.update(req.body);

        res.status(200).json({ 
            success: true,
            message: 'Booking updated successfully', 
            data: updatedBooking 
        });
    } catch (error) {
        console.error('Update booking error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error updating booking', 
            error: error.message 
        });
    }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        // Get user's business
        const business = await Business.findOne({ where: { userId } });
        if (!business) {
            return res.status(404).json({ 
                success: false, 
                message: 'Business not found' 
            });
        }

        const booking = await Booking.findOne({
            where: { 
                id,
                businessId: business.id
            }
        });

        if (!booking) {
            return res.status(404).json({ 
                success: false, 
                message: 'Booking not found' 
            });
        }

        await booking.destroy();

        res.status(200).json({ 
            success: true,
            message: 'Booking deleted successfully' 
        });
    } catch (error) {
        console.error('Delete booking error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error deleting booking', 
            error: error.message 
        });
    }
};