const sequelize = require('./src/config/database');
const User = require('./src/models/User');
const Business = require('./src/models/Business');
const Booking = require('./src/models/Booking');

async function setupDatabase() {
  try {
    // Test the connection
    console.log('Testing database connection...');
    await sequelize.authenticate();
    console.log('✅ Database connection has been established successfully.');

    // Sync all models
    console.log('Creating/updating database tables...');
    await sequelize.sync({ force: false }); // Set to true to drop and recreate tables
    console.log('✅ All models were synchronized successfully.');

    console.log('🎉 Database setup completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    console.error('\nMake sure PostgreSQL is running and the database exists.');
    console.error('You can create the database using: createdb autosaaz_db');
    process.exit(1);
  }
}

setupDatabase();
