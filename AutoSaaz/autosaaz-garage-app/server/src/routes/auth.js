const express = require('express');
const { register, login, verifyAccount, getMe, sendVerificationCode } = require('../controllers/authController');
const { validateRegistration, validateLogin } = require('../middleware/validation');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.post('/register', validateRegistration, register);
router.post('/login', validateLogin, login);
router.post('/verify', verifyAccount);
router.post('/send-verification', sendVerificationCode);
router.get('/me', authMiddleware, getMe);

module.exports = router;