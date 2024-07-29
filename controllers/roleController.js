const Role = require('../models/roleSchema');
const logger = require('../logger'); 
const { ENGLISH_MESSAGE, STATUS_CODES } = require('../util/constant'); 

// Create a new role
const createRole = async (req, res) => {
    try {
        const { role_name, role_code } = req.body;

        // Check if the role_code already exists
        const existingRole = await Role.findOne({ role_code });
        if (existingRole) {
            logger.warn(`Role creation failed: Role code ${role_code} already exists`);
            return res.status(STATUS_CODES.BAD_REQUEST).json({ error: ENGLISH_MESSAGE.CREATE_FAIL });
        }

        const data = new Role({ role_name, role_code });
        await data.save();
        logger.info(`Role created successfully: ${role_name} (${role_code})`);
        res.status(STATUS_CODES.SUCCESS).json({ message: ENGLISH_MESSAGE.CREATE_SUCC, data });
    } catch (error) {
        logger.error('Failed to create role', { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.CREATE_FAIL });
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.find();
        logger.info('Fetched all roles successfully');
        res.status(STATUS_CODES.SUCCESS).json({ message: ENGLISH_MESSAGE.GET_SUCC, roles });
    } catch (error) {
        logger.error('Failed to fetch roles', { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.GET_FAIL });
    }
};

// Get a single role by ID
const getRoleById = async (req, res) => {
    try {
        const role = await Role.findById(req.params.id);
        if (!role) {
            logger.warn(`Role not found: ID ${req.params.id}`);
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: ENGLISH_MESSAGE.GET_BY_ID_FAIL });
        }
        logger.info(`Fetched role successfully: ID ${req.params.id}`);
        res.status(STATUS_CODES.SUCCESS).json({ message: ENGLISH_MESSAGE.GET_BY_ID_SUCC, role });
    } catch (error) {
        logger.error(`Failed to fetch role: ID ${req.params.id}`, { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.GET_BY_ID_FAIL });
    }
};

// Update a role by ID
const updateRoleById = async (req, res) => {
    try {
        const { role_name, role_code } = req.body;

        // Check if the role_code already exists for another role
        const existingRole = await Role.findOne({ role_code, _id: { $ne: req.params.id } });
        if (existingRole) {
            logger.warn(`Role update failed: Role code ${role_code} already exists`);
            return res.status(STATUS_CODES.BAD_REQUEST).json({ error: ENGLISH_MESSAGE.UPDATE_FAIL });
        }

        const role = await Role.findByIdAndUpdate(req.params.id, { role_name, role_code }, { new: true });
        if (!role) {
            logger.warn(`Role not found for update: ID ${req.params.id}`);
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: ENGLISH_MESSAGE.UPDATE_FAIL });
        }
        logger.info(`Role updated successfully: ID ${req.params.id}`);
        res.status(STATUS_CODES.SUCCESS).json({ message: ENGLISH_MESSAGE.UPDATE_SUCC, role });
    } catch (error) {
        logger.error(`Failed to update role: ID ${req.params.id}`, { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.UPDATE_FAIL });
    }
};

// Delete a role by ID
const deleteRoleById = async (req, res) => {
    try {
        const role = await Role.findByIdAndDelete(req.params.id);
        if (!role) {
            logger.warn(`Role not found for deletion: ID ${req.params.id}`);
            return res.status(STATUS_CODES.NOT_FOUND).json({ error: ENGLISH_MESSAGE.DELETE_FAIL });
        }
        logger.info(`Role deleted successfully: ID ${req.params.id}`);
        res.status(STATUS_CODES.SUCCESS).json({ message: ENGLISH_MESSAGE.DELETE_SUCC });
    } catch (error) {
        logger.error(`Failed to delete role: ID ${req.params.id}`, { error: error.message });
        res.status(STATUS_CODES.SERVER_ERROR).json({ error: ENGLISH_MESSAGE.DELETE_FAIL });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRoleById,
    deleteRoleById
};
