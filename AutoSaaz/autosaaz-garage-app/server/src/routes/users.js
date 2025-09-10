const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const { authenticate } = require('../middleware/auth');

// Route to get user profile
router.get('/profile', authenticate, userController.getUserProfile);

// Route to update user profile
router.put('/profile', authenticate, userController.updateUserProfile);

// Route to update business profile
router.put('/business', authenticate, userController.updateBusinessProfile);

module.exports = router;