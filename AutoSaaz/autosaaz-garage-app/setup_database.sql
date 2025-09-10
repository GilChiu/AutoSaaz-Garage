-- AutoSaaz Garage App - PostgreSQL Database Setup
-- Run this file in psql after creating the database
-- Usage: psql -U postgres -d autosaaz_db -f setup_database.sql

-- Create database (run this separately if needed)
-- CREATE DATABASE autosaaz_db;

-- Connect to the database
\c autosaaz_db;

-- Enable UUID extension (optional, for future use)
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create ENUM types for status and priority
CREATE TYPE booking_status AS ENUM ('pending', 'confirmed', 'cancelled', 'completed');
CREATE TYPE booking_priority AS ENUM ('low', 'medium', 'high');

-- =================================
-- CREATE TABLES
-- =================================

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    verification_code VARCHAR(100),
    phone VARCHAR(20),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Businesses table
CREATE TABLE IF NOT EXISTS businesses (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    company_name VARCHAR(255) NOT NULL,
    trade_license VARCHAR(255),
    vat_certification VARCHAR(255),
    address VARCHAR(255) NOT NULL,
    city VARCHAR(100) NOT NULL,
    state VARCHAR(100) NOT NULL,
    zip_code VARCHAR(20) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    website VARCHAR(255),
    is_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_business_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Bookings/Appointments table
CREATE TABLE IF NOT EXISTS bookings (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL,
    business_id INT NOT NULL,
    customer_name VARCHAR(255) NOT NULL,
    customer_email VARCHAR(255) NOT NULL,
    customer_phone VARCHAR(20),
    vehicle_make VARCHAR(100) NOT NULL,
    vehicle_model VARCHAR(100) NOT NULL,
    vehicle_year INT NOT NULL,
    service_type VARCHAR(255) NOT NULL,
    appointment_date TIMESTAMP NOT NULL,
    status booking_status DEFAULT 'pending',
    priority booking_priority DEFAULT 'medium',
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_booking_user FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    CONSTRAINT fk_booking_business FOREIGN KEY (business_id) REFERENCES businesses(id) ON DELETE CASCADE
);

-- =================================
-- CREATE INDEXES
-- =================================

-- Users indexes
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_created_at ON users(created_at);

-- Businesses indexes
CREATE INDEX idx_businesses_user_id ON businesses(user_id);
CREATE INDEX idx_businesses_city ON businesses(city);
CREATE INDEX idx_businesses_state ON businesses(state);

-- Bookings indexes
CREATE INDEX idx_bookings_user_id ON bookings(user_id);
CREATE INDEX idx_bookings_business_id ON bookings(business_id);
CREATE INDEX idx_bookings_appointment_date ON bookings(appointment_date);
CREATE INDEX idx_bookings_status ON bookings(status);
CREATE INDEX idx_bookings_customer_email ON bookings(customer_email);

-- =================================
-- CREATE TRIGGERS FOR UPDATED_AT
-- =================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updating updated_at
CREATE TRIGGER update_users_updated_at 
    BEFORE UPDATE ON users 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_businesses_updated_at 
    BEFORE UPDATE ON businesses 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_bookings_updated_at 
    BEFORE UPDATE ON bookings 
    FOR EACH ROW 
    EXECUTE FUNCTION update_updated_at_column();

-- =================================
-- INSERT SAMPLE DATA
-- =================================

-- Insert sample users
INSERT INTO users (first_name, last_name, email, password_hash, phone, is_verified, created_at, updated_at) VALUES
('John', 'Doe', 'john@example.com', '$2a$10$example_hash_1', '555-0001', true, NOW(), NOW()),
('Jane', 'Smith', 'jane@example.com', '$2a$10$example_hash_2', '555-0002', true, NOW(), NOW()),
('Mike', 'Johnson', 'mike@example.com', '$2a$10$example_hash_3', '555-0003', false, NOW(), NOW()),
('Ali', 'Khan', 'ali@example.com', '$2a$10$example_hash_4', '555-0004', true, NOW(), NOW()),
('Sara', 'Malik', 'sara@example.com', '$2a$10$example_hash_5', '555-0005', true, NOW(), NOW()),
('Hamza', 'Ahmed', 'hamza@example.com', '$2a$10$example_hash_6', '555-0006', false, NOW(), NOW()),
('Rehman', 'Shah', 'rehman@example.com', '$2a$10$example_hash_7', '555-0007', true, NOW(), NOW()),
('Noor', 'Ali', 'noor@example.com', '$2a$10$example_hash_8', '555-0008', true, NOW(), NOW()),
('Sunny', 'Kumar', 'sunny@example.com', '$2a$10$example_hash_9', '555-0009', false, NOW(), NOW()),
('Michael', 'Johnson', 'mjohnson@example.com', '$2a$10$example_hash_10', '555-0010', true, NOW(), NOW())
ON CONFLICT (email) DO NOTHING;

-- Insert sample businesses
INSERT INTO businesses (user_id, company_name, address, city, state, zip_code, phone, email, website, is_verified, created_at, updated_at) VALUES
(1, 'AAA Auto Garage', '123 Main St', 'New York', 'NY', '10001', '555-0101', 'info@aaagarage.com', 'www.aaagarage.com', true, NOW(), NOW()),
(2, 'Quick Fix Motors', '456 Oak Ave', 'Los Angeles', 'CA', '90001', '555-0202', 'contact@quickfix.com', 'www.quickfix.com', true, NOW(), NOW()),
(3, 'Elite Auto Service', '789 Pine St', 'Chicago', 'IL', '60601', '555-0303', 'hello@eliteauto.com', 'www.eliteauto.com', false, NOW(), NOW()),
(4, 'Premium Car Care', '321 Elm St', 'Houston', 'TX', '77001', '555-0404', 'info@premiumcare.com', 'www.premiumcare.com', true, NOW(), NOW())
ON CONFLICT DO NOTHING;

-- Insert sample bookings/appointments
INSERT INTO bookings (user_id, business_id, customer_name, customer_email, customer_phone, vehicle_make, vehicle_model, vehicle_year, service_type, appointment_date, status, priority, notes, created_at, updated_at) VALUES
(2, 1, 'Ali Khan', 'ali@example.com', '555-1001', 'Honda', 'Civic', 2022, 'Brake pad replacement', '2025-09-15 10:00:00', 'pending', 'high', 'Customer reported squeaking noise from brakes', NOW(), NOW()),
(3, 1, 'Sara Malik', 'sara@example.com', '555-1002', 'Toyota', 'Camry', 2021, 'AC Repair', '2025-09-20 14:00:00', 'pending', 'medium', 'AC not cooling properly', NOW(), NOW()),
(4, 1, 'Hamza Ahmed', 'hamza@example.com', '555-1003', 'BMW', 'X5', 2020, 'Oil Change', '2025-09-18 11:00:00', 'confirmed', 'low', 'Regular maintenance', NOW(), NOW()),
(5, 1, 'Rehman Shah', 'rehman@example.com', '555-1004', 'Mercedes', 'C-Class', 2019, 'Battery Change', '2025-09-22 15:00:00', 'pending', 'medium', 'Battery not holding charge', NOW(), NOW()),
(6, 1, 'Noor Ali', 'noor@example.com', '555-1005', 'Audi', 'A4', 2022, 'AC Repair', '2025-09-05 09:00:00', 'completed', 'medium', 'Completed successfully', NOW(), NOW()),
(7, 1, 'Sunny Kumar', 'sunny@example.com', '555-1006', 'Ford', 'F-150', 2023, 'Oil Change', '2025-09-03 16:00:00', 'completed', 'low', 'Regular service completed', NOW(), NOW()),
(10, 1, 'Michael Johnson', 'mjohnson@example.com', '555-1007', 'BMW', 'X5', 2022, 'General Inspection', '2025-09-12 11:00:00', 'confirmed', 'medium', 'Annual inspection', NOW(), NOW()),
(10, 1, 'Michael Johnson', 'mjohnson@example.com', '555-1007', 'BMW', 'X5', 2022, 'Brake Service', '2025-09-14 11:00:00', 'confirmed', 'high', 'Brake maintenance', NOW(), NOW()),
(8, 2, 'Alex Wilson', 'alex@example.com', '555-1008', 'Chevrolet', 'Camaro', 2021, 'Engine Tune-up', '2025-09-25 10:30:00', 'pending', 'medium', 'Performance optimization', NOW(), NOW()),
(9, 2, 'Lisa Brown', 'lisa@example.com', '555-1009', 'Nissan', 'Altima', 2020, 'Tire Replacement', '2025-09-28 13:00:00', 'pending', 'low', 'All four tires need replacement', NOW(), NOW())
ON CONFLICT DO NOTHING;

-- =================================
-- CREATE VIEWS (Optional)
-- =================================

-- View for business with user details
CREATE OR REPLACE VIEW business_details AS
SELECT 
    b.id,
    b.company_name,
    b.address,
    b.city,
    b.state,
    b.zip_code,
    b.phone,
    b.email,
    b.website,
    b.is_verified,
    u.first_name AS owner_first_name,
    u.last_name AS owner_last_name,
    u.email AS owner_email,
    b.created_at
FROM businesses b
JOIN users u ON b.user_id = u.id;

-- View for booking details with business and customer info
CREATE OR REPLACE VIEW booking_details AS
SELECT 
    bk.id,
    bk.customer_name,
    bk.customer_email,
    bk.customer_phone,
    bk.vehicle_make,
    bk.vehicle_model,
    bk.vehicle_year,
    bk.service_type,
    bk.appointment_date,
    bk.status,
    bk.priority,
    bk.notes,
    b.company_name,
    b.phone AS business_phone,
    u.first_name AS owner_first_name,
    u.last_name AS owner_last_name,
    bk.created_at
FROM bookings bk
JOIN businesses b ON bk.business_id = b.id
JOIN users u ON bk.user_id = u.id;

-- =================================
-- GRANT PERMISSIONS
-- =================================

-- Grant permissions to the database user (if different from postgres)
-- GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO autosaaz_user;
-- GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO autosaaz_user;

-- =================================
-- VERIFICATION QUERIES
-- =================================

-- Show table information
\dt

-- Show user count
SELECT 'Users' AS table_name, COUNT(*) AS record_count FROM users
UNION ALL
SELECT 'Businesses' AS table_name, COUNT(*) AS record_count FROM businesses
UNION ALL
SELECT 'Bookings' AS table_name, COUNT(*) AS record_count FROM bookings;

-- Show sample data
SELECT 'Sample Users:' AS info;
SELECT id, first_name, last_name, email, is_verified FROM users LIMIT 5;

SELECT 'Sample Businesses:' AS info;
SELECT id, company_name, city, state, is_verified FROM businesses LIMIT 3;

SELECT 'Sample Bookings:' AS info;
SELECT id, customer_name, vehicle_make, vehicle_model, service_type, status FROM bookings LIMIT 5;

-- Success message
SELECT '✅ Database setup completed successfully!' AS status;
