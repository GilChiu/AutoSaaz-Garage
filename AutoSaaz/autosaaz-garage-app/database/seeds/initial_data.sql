-- Insert sample users
INSERT INTO users (first_name, last_name, email, password_hash, created_at, updated_at) VALUES
('John', 'Doe', 'john@example.com', '$2a$10$example_hash_1', NOW(), NOW()),
('Jane', 'Smith', 'jane@example.com', '$2a$10$example_hash_2', NOW(), NOW()),
('Mike', 'Johnson', 'mike@example.com', '$2a$10$example_hash_3', NOW(), NOW()),
('Ali', 'Khan', 'ali@example.com', '$2a$10$example_hash_4', NOW(), NOW()),
('Sara', 'Malik', 'sara@example.com', '$2a$10$example_hash_5', NOW(), NOW()),
('Hamza', 'Ahmed', 'hamza@example.com', '$2a$10$example_hash_6', NOW(), NOW()),
('Rehman', 'Shah', 'rehman@example.com', '$2a$10$example_hash_7', NOW(), NOW()),
('Noor', 'Ali', 'noor@example.com', '$2a$10$example_hash_8', NOW(), NOW()),
('Sunny', 'Kumar', 'sunny@example.com', '$2a$10$example_hash_9', NOW(), NOW()),
('Michael', 'Johnson', 'mjohnson@example.com', '$2a$10$example_hash_10', NOW(), NOW());

-- Insert sample businesses
INSERT INTO businesses (user_id, company_name, address, city, state, zip_code, phone, email, created_at, updated_at) VALUES
(1, 'AAA Auto Garage', '123 Main St', 'New York', 'NY', '10001', '555-0101', 'info@aaagarage.com', NOW(), NOW()),
(2, 'Quick Fix Motors', '456 Oak Ave', 'Los Angeles', 'CA', '90001', '555-0202', 'contact@quickfix.com', NOW(), NOW());

-- Insert sample appointments/bookings
INSERT INTO bookings (user_id, business_id, customer_name, customer_email, customer_phone, vehicle_make, vehicle_model, vehicle_year, service_type, appointment_date, status, priority, notes, created_at, updated_at) VALUES
(2, 1, 'Ali Khan', 'ali@example.com', '555-1001', 'Honda', 'Civic', 2022, 'Brake pad replacement', '2025-06-05 10:00:00', 'pending', 'high', 'Customer reported squeaking noise from brakes', NOW(), NOW()),
(3, 1, 'Sara Malik', 'sara@example.com', '555-1002', 'Toyota', 'Camry', 2021, 'AC Repair', '2025-06-10 14:00:00', 'pending', 'medium', 'AC not cooling properly', NOW(), NOW()),
(4, 1, 'Hamza Ahmed', 'hamza@example.com', '555-1003', 'BMW', 'X5', 2020, 'Oil Change', '2025-06-10 11:00:00', 'pending', 'low', 'Regular maintenance', NOW(), NOW()),
(5, 1, 'Rehman Shah', 'rehman@example.com', '555-1004', 'Mercedes', 'C-Class', 2019, 'Battery Change', '2025-06-10 15:00:00', 'pending', 'medium', 'Battery not holding charge', NOW(), NOW()),
(6, 1, 'Noor Ali', 'noor@example.com', '555-1005', 'Audi', 'A4', 2022, 'AC Repair', '2025-06-10 09:00:00', 'completed', 'medium', 'Completed successfully', NOW(), NOW()),
(7, 1, 'Sunny Kumar', 'sunny@example.com', '555-1006', 'Ford', 'F-150', 2023, 'Oil Change', '2025-06-10 16:00:00', 'completed', 'low', 'Regular service completed', NOW(), NOW()),
(10, 1, 'Michael Johnson', 'mjohnson@example.com', '555-1007', 'BMW', 'X5', 2022, 'General Inspection', '2025-06-06 11:00:00', 'confirmed', 'medium', 'Annual inspection', NOW(), NOW()),
(10, 1, 'Michael Johnson', 'mjohnson@example.com', '555-1007', 'BMW', 'X5', 2022, 'Brake Service', '2025-06-07 11:00:00', 'confirmed', 'medium', 'Brake maintenance', NOW(), NOW());