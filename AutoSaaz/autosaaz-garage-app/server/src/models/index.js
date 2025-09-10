const User = require('./User');
const Business = require('./Business');
const Booking = require('./Booking');

// Define associations
User.hasOne(Business, { foreignKey: 'userId', as: 'business' });
Business.belongsTo(User, { foreignKey: 'userId', as: 'owner' });

User.hasMany(Booking, { foreignKey: 'userId', as: 'bookings' });
Booking.belongsTo(User, { foreignKey: 'userId', as: 'customer' });

Business.hasMany(Booking, { foreignKey: 'businessId', as: 'appointments' });
Booking.belongsTo(Business, { foreignKey: 'businessId', as: 'business' });

module.exports = {
  User,
  Business,
  Booking
};
