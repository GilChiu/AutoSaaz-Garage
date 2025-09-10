const { Booking, User, Business } = require('../models');
const { Op } = require('sequelize');

const appointmentController = {
  // Get all appointments for the authenticated user's business
  getAppointments: async (req, res) => {
    try {
      const userId = req.user.id;
      
      // Get user's business
      const business = await Business.findOne({ where: { userId } });
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }

      // Get appointments for the business
      const appointments = await Booking.findAll({
        where: { 
          businessId: business.id,
          appointmentDate: {
            [Op.gte]: new Date() // Only future appointments
          }
        },
        order: [['appointmentDate', 'ASC']],
        include: [
          {
            model: User,
            as: 'customer',
            attributes: ['id', 'email', 'firstName', 'lastName']
          }
        ]
      });

      res.json({
        success: true,
        data: appointments
      });
    } catch (error) {
      console.error('Error fetching appointments:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching appointments' 
      });
    }
  },

  // Get a specific appointment by ID
  getAppointmentById: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Get user's business
      const business = await Business.findOne({ where: { userId } });
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }

      const appointment = await Booking.findOne({
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

      if (!appointment) {
        return res.status(404).json({ 
          success: false, 
          message: 'Appointment not found' 
        });
      }

      res.json({
        success: true,
        data: appointment
      });
    } catch (error) {
      console.error('Error fetching appointment:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching appointment' 
      });
    }
  },

  // Accept an appointment
  acceptAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Get user's business
      const business = await Business.findOne({ where: { userId } });
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }

      const appointment = await Booking.findOne({
        where: { 
          id,
          businessId: business.id
        }
      });

      if (!appointment) {
        return res.status(404).json({ 
          success: false, 
          message: 'Appointment not found' 
        });
      }

      if (appointment.status !== 'pending') {
        return res.status(400).json({
          success: false,
          message: 'Appointment cannot be accepted in current status'
        });
      }

      await appointment.update({ status: 'confirmed' });

      res.json({
        success: true,
        message: 'Appointment accepted successfully',
        data: appointment
      });
    } catch (error) {
      console.error('Error accepting appointment:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error accepting appointment' 
      });
    }
  },

  // Cancel an appointment
  cancelAppointment: async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.id;
      
      // Get user's business
      const business = await Business.findOne({ where: { userId } });
      if (!business) {
        return res.status(404).json({ message: 'Business not found' });
      }

      const appointment = await Booking.findOne({
        where: { 
          id,
          businessId: business.id
        }
      });

      if (!appointment) {
        return res.status(404).json({ 
          success: false, 
          message: 'Appointment not found' 
        });
      }

      if (appointment.status === 'completed') {
        return res.status(400).json({
          success: false,
          message: 'Cannot cancel completed appointment'
        });
      }

      await appointment.update({ status: 'cancelled' });

      res.json({
        success: true,
        message: 'Appointment cancelled successfully',
        data: appointment
      });
    } catch (error) {
      console.error('Error cancelling appointment:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error cancelling appointment' 
      });
    }
  },

  // Create a new appointment (for testing purposes)
  createAppointment: async (req, res) => {
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
        return res.status(404).json({ message: 'Business not found' });
      }

      const appointment = await Booking.create({
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
        message: 'Appointment created successfully',
        data: appointment
      });
    } catch (error) {
      console.error('Error creating appointment:', error);
      res.status(500).json({ 
        success: false, 
        message: 'Error creating appointment' 
      });
    }
  }
};

module.exports = appointmentController;
