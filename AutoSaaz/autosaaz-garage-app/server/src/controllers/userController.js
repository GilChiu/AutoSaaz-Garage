const User = require('../models/User');
const Business = require('../models/Business');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Get user profile
exports.getUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: { exclude: ['passwordHash'] },
            include: [
                {
                    model: Business,
                    as: 'business',
                    attributes: ['id', 'companyName', 'address', 'city', 'state', 'phone', 'email']
                }
            ]
        });

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        res.status(200).json({ 
            success: true,
            data: user 
        });
    } catch (error) {
        console.error('Get user profile error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error fetching user profile', 
            error: error.message 
        });
    }
};

// Update user profile
exports.updateUserProfile = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id);

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        const { firstName, lastName, phone } = req.body;
        
        const updatedUser = await user.update({
            firstName: firstName || user.firstName,
            lastName: lastName || user.lastName,
            phone: phone || user.phone
        });

        res.status(200).json({ 
            success: true,
            message: 'Profile updated successfully',
            data: {
                id: updatedUser.id,
                firstName: updatedUser.firstName,
                lastName: updatedUser.lastName,
                email: updatedUser.email,
                phone: updatedUser.phone
            }
        });
    } catch (error) {
        console.error('Update user profile error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error updating user profile', 
            error: error.message 
        });
    }
};

// Create or update business profile
exports.updateBusinessProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const {
            companyName,
            tradeLicense,
            vatCertification,
            address,
            city,
            state,
            zipCode,
            phone,
            email,
            website
        } = req.body;

        // Check if business already exists
        let business = await Business.findOne({ where: { userId } });

        if (business) {
            // Update existing business
            business = await business.update({
                companyName: companyName || business.companyName,
                tradeLicense: tradeLicense || business.tradeLicense,
                vatCertification: vatCertification || business.vatCertification,
                address: address || business.address,
                city: city || business.city,
                state: state || business.state,
                zipCode: zipCode || business.zipCode,
                phone: phone || business.phone,
                email: email || business.email,
                website: website || business.website
            });
        } else {
            // Create new business
            business = await Business.create({
                userId,
                companyName,
                tradeLicense,
                vatCertification,
                address,
                city,
                state,
                zipCode,
                phone,
                email,
                website
            });
        }

        res.status(200).json({ 
            success: true,
            message: 'Business profile updated successfully',
            data: business
        });
    } catch (error) {
        console.error('Update business profile error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Error updating business profile', 
            error: error.message 
        });
    }
};