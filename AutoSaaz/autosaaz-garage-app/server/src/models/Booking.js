const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Booking extends Model {}

Booking.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
    field: 'user_id'
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'businesses',
      key: 'id',
    },
    field: 'business_id'
  },
  customerName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'customer_name'
  },
  customerEmail: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'customer_email'
  },
  customerPhone: {
    type: DataTypes.STRING,
    allowNull: true,
    field: 'customer_phone'
  },
  vehicleMake: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'vehicle_make'
  },
  vehicleModel: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'vehicle_model'
  },
  vehicleYear: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'vehicle_year'
  },
  serviceType: {
    type: DataTypes.STRING,
    allowNull: false,
    field: 'service_type'
  },
  appointmentDate: {
    type: DataTypes.DATE,
    allowNull: false,
    field: 'appointment_date'
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'cancelled', 'completed'),
    allowNull: false,
    defaultValue: 'pending',
  },
  priority: {
    type: DataTypes.ENUM('low', 'medium', 'high'),
    allowNull: false,
    defaultValue: 'medium',
  },
  notes: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Booking',
  tableName: 'bookings',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Booking;