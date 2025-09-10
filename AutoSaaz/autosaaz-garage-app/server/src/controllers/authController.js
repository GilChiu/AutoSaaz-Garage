const User = require('../models/User');
const Business = require('../models/Business');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

// Register a new user
exports.register = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation errors', 
                errors: errors.array() 
            });
        }

        const { firstName, lastName, email, password, phone, address, street, state, location, verificationCode: providedCode } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ 
                success: false, 
                message: 'User already exists with this email' 
            });
        }

        // Hash password
        const passwordHash = await User.hashPassword(password);
        
        // For now, we'll simulate verification by accepting any 6-digit code
        // In production, you'd verify the code against what was sent via email/SMS
        if (providedCode && providedCode.length === 6) {
            // Create user with verification
            const newUser = await User.create({ 
                firstName, 
                lastName, 
                email, 
                passwordHash,
                phone,
                verificationCode: null, // Clear verification code after successful verification
                isVerified: true
            });

            // Create business if location data is provided
            let business = null;
            if (address && street && state && location) {
                business = await Business.create({
                    userId: newUser.id,
                    companyName: `${firstName} ${lastName} Auto Shop`, // Default company name
                    address: `${address}, ${street}`,
                    city: location,
                    state: state,
                    zipCode: '00000', // Default zipcode
                    phone: phone,
                    email: email,
                    isVerified: true
                });
            }

            // Generate JWT token
            const token = jwt.sign(
                { id: newUser.id, email: newUser.email }, 
                process.env.JWT_SECRET, 
                { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
            );

            res.status(201).json({ 
                success: true,
                message: 'User registered and verified successfully.',
                token,
                user: {
                    id: newUser.id,
                    firstName: newUser.firstName,
                    lastName: newUser.lastName,
                    email: newUser.email,
                    isVerified: newUser.isVerified
                },
                business: business ? {
                    id: business.id,
                    companyName: business.companyName,
                    address: business.address,
                    city: business.city,
                    state: business.state,
                    phone: business.phone
                } : null
            });
        } else {
            // Just send verification code without creating user yet
            // In production, you'd send this via email/SMS
            const demoVerificationCode = Math.floor(100000 + Math.random() * 900000).toString();
            
            res.status(200).json({ 
                success: true,
                message: 'Please verify your email with the code sent.',
                verificationCode: demoVerificationCode, // In production, don't send this in response
                needsVerification: true
            });
        }
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error registering user', 
            error: error.message 
        });
    }
};

// Login a user
exports.login = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ 
                success: false, 
                message: 'Validation errors', 
                errors: errors.array() 
            });
        }

        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ 
                success: false, 
                message: 'Invalid email or password' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { id: user.id, email: user.email }, 
            process.env.JWT_SECRET, 
            { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
        );

        // Get user's business if exists
        const business = await Business.findOne({ where: { userId: user.id } });

        res.status(200).json({ 
            success: true,
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isVerified: user.isVerified
            },
            business: business ? {
                id: business.id,
                companyName: business.companyName,
                address: business.address,
                city: business.city,
                state: business.state,
                phone: business.phone
            } : null
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error logging in', 
            error: error.message 
        });
    }
};

// Verify user account
exports.verifyAccount = async (req, res) => {
    try {
        const { email, verificationCode } = req.body;

        if (!email || !verificationCode) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email and verification code are required' 
            });
        }

        // Find user
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: 'User not found' 
            });
        }

        if (user.isVerified) {
            return res.status(400).json({ 
                success: false, 
                message: 'Account is already verified' 
            });
        }

        if (user.verificationCode !== verificationCode) {
            return res.status(400).json({ 
                success: false, 
                message: 'Invalid verification code' 
            });
        }

        // Update user as verified
        await user.update({ 
            isVerified: true, 
            verificationCode: null 
        });

        res.status(200).json({ 
            success: true,
            message: 'Account verified successfully' 
        });
    } catch (error) {
        console.error('Verification error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error verifying account', 
            error: error.message 
        });
    }
};

// Send verification code (for demo purposes)
exports.sendVerificationCode = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ 
                success: false, 
                message: 'Email is required' 
            });
        }

        // Generate verification code
        const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
        
        // In production, you would:
        // 1. Store this code temporarily (Redis, database, etc.)
        // 2. Send it via email/SMS
        // 3. Set expiration time
        
        res.status(200).json({ 
            success: true,
            message: 'Verification code sent successfully.',
            verificationCode: verificationCode // In production, don't send this in response
        });
    } catch (error) {
        console.error('Send verification code error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error sending verification code', 
            error: error.message 
        });
    }
};

// Get current user info
exports.getMe = async (req, res) => {
    try {
        const user = req.user; // From auth middleware
        
        // Get user's business if exists
        const business = await Business.findOne({ where: { userId: user.id } });

        res.status(200).json({ 
            success: true,
            user: {
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                isVerified: user.isVerified
            },
            business: business ? {
                id: business.id,
                companyName: business.companyName,
                address: business.address,
                city: business.city,
                state: business.state,
                phone: business.phone
            } : null
        });
    } catch (error) {
        console.error('Get user error:', error);
        res.status(500).json({ 
            success: false, 
            message: 'Error fetching user data', 
            error: error.message 
        });
    }
};