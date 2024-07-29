const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const Role = require('../models/roleSchema');
const { registerValidation, loginValidation } = require('../validation');
require('dotenv').config();
const logger = require('../logger');
const { ENGLISH_MESSAGE, STATUS_CODES } = require('../util/constant'); 
// User registration
const registerUser = async (req, res) => {
    // Validate the request body
    const { error } = registerValidation(req.body);
    if (error) {
        logger.error('Validation error: ', { message: error.details[0].message });
        return res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.details[0].message });
    }

    try {
        const { name, email, password, mobile, role_id } = req.body;

        // Check if a user with the same email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            logger.warn('Registration attempt with existing email', { email });
            return res.status(STATUS_CODES.BAD_REQUEST).json({ error: ENGLISH_MESSAGE.CREATE_FAIL });
        }

        // Check if the role_id exists
        const role = await Role.findById(role_id);
        if (!role) {
            logger.warn('Invalid role selected', { role_id });
            return res.status(STATUS_CODES.BAD_REQUEST).json({ error: ENGLISH_MESSAGE.CREATE_FAIL });
        }

        // Hash the user's password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user instance
        const user = new User({
            name,
            email,
            password: hashedPassword,
            mobile,
            role_id: role._id
        });

        // Save the new user
        await user.save();

        logger.info('User registered successfully', { userId: user._id });
        res.status(STATUS_CODES.SUCCESS).json({ message: ENGLISH_MESSAGE.CREATE_SUCC, user });
    } catch (error) {
        if (error.code === 11000) { // MongoDB duplicate key error code
            logger.error('Duplicate key error', { error });
            res.status(STATUS_CODES.BAD_REQUEST).json({ error: ENGLISH_MESSAGE.CREATE_FAIL, details: error.keyValue });
        } else {
            logger.error('Registration failed', { error: error.message });
            res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.CREATE_FAIL, details: error.message });
        }
    }
};

// User login
const loginUser = async (req, res) => {
    // Validate the request body
    const { error } = loginValidation(req.body);
    if (error) {
        logger.error('Validation error: ', { message: error.details[0].message });
        return res.status(STATUS_CODES.BAD_REQUEST).json({ error: error.details[0].message });
    }

    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).populate('role_id');
        if (!user) {
            logger.warn('Authentication failed. User not found', { email });
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: ENGLISH_MESSAGE.GET_FAIL });
        }

        // Check if the password matches
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            logger.warn('Authentication failed. Incorrect password', { email });
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: ENGLISH_MESSAGE.GET_FAIL });
        }

        // Generate a JWT token
        const token = jwt.sign(
            { userId: user._id, role: user.role_id.role_name },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        logger.info('User login successful', { userId: user._id });
        res.status(STATUS_CODES.SUCCESS).json({ message: ENGLISH_MESSAGE.GET_SUCC, token, role: user.role_id });
    } catch (error) {
        logger.error('Login failed', { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.GET_FAIL, details: error.message });
    }
};

// GetAll Users
const getAllUsers = async (req, res) => {
    try {
        // Fetch all users and populate the role information
        const users = await User.find().populate('role_id');
        logger.info('Fetched all users');
        res.status(STATUS_CODES.SUCCESS).json({ users });
    } catch (error) {
        logger.error('Error getting users', { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.GET_FAIL, details: error.message });
    }
};

// GetUser ById
const getUser = async (req, res) => {
    try {
        // Get user ID from request parameters
        const { id } = req.params;

        // Find the user by ID and populate the role information
        const user = await User.findById(id).populate('role_id');

        if (!user) {
            logger.warn('User not found', { userId: id });
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: ENGLISH_MESSAGE.GET_BY_ID_FAIL });
        }

        logger.info('Fetched user by ID', { userId: id });
        res.status(STATUS_CODES.SUCCESS).json({ user });
    } catch (error) {
        logger.error('Error getting user', { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.GET_BY_ID_FAIL, details: error.message });
    }
};

// Get Profile
const getProfile = async (req, res) => {
    try {
        const { userId } = req.user; // This comes from JWT payload

        // Ensure that 'userId' is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            logger.warn('Invalid user ID format', { userId });
            return res.status(STATUS_CODES.BAD_REQUEST).json({ error: ENGLISH_MESSAGE.GET_FAIL });
        }

        const user = await User.findById(userId).populate('role_id');

        if (!user) {
            logger.warn('User not found', { userId });
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: ENGLISH_MESSAGE.GET_FAIL });
        }

        logger.info('Fetched user profile', { userId });
        res.status(STATUS_CODES.SUCCESS).json({ user });
    } catch (error) {
        logger.error('Error accessing profile', { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.GET_FAIL, details: error.message });
    }
};

module.exports = {
    registerUser,
    loginUser,
    getAllUsers,
    getUser,
    getProfile
};
