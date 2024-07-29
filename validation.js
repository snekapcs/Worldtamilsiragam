const Joi = require('joi');

// Registration validation schema
const registerValidation = (data) => {
    const schema = Joi.object({
        name: Joi.string().min(2).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        mobile: Joi.string().required(),
        role_id: Joi.string().required()
    });
    return schema.validate(data);
};

// Login validation schema
const loginValidation = (data) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });
    return schema.validate(data);
};

module.exports = {
    registerValidation,
    loginValidation
};