const { body, validationResult } = require('express-validator');

const validateRegistration = [
    body('firstName')
        .notEmpty()
        .withMessage('First name is required')
        .isLength({ min: 2 })
        .withMessage('First name must be at least 2 characters long'),
    body('lastName')
        .notEmpty()
        .withMessage('Last name is required')
        .isLength({ min: 2 })
        .withMessage('Last name must be at least 2 characters long'),
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .notEmpty()
        .withMessage('Password is required')
        .isLength({ min: 6 })
        .withMessage('Password must be at least 6 characters long'),
    body('phone')
        .notEmpty()
        .withMessage('Phone number is required')
        .isLength({ min: 10 })
        .withMessage('Phone number must be at least 10 digits'),
    // Business fields are optional (for multi-step registration)
    body('address').optional(),
    body('street').optional(),
    body('state').optional(),
    body('location').optional(),
    body('verificationCode').optional(),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

const validateLogin = [
    body('email')
        .notEmpty()
        .withMessage('Email is required')
        .isEmail()
        .withMessage('Email is not valid'),
    body('password')
        .notEmpty()
        .withMessage('Password is required'),
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = {
    validateRegistration,
    validateLogin
};