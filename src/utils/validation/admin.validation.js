const Joi = require("joi");

//?====================create admin=================

exports.createAdminValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).pattern(/^(?=.*[A-Za-z])[A-Za-z0-9_]+$/).required().messages({ "string.base": "Username must be a text", "string.empty": "Username cannot be empty", "string.min": "Username should have at least 3 characters", "string.max": "Username should not exceed 30 characters", "any.required": "Username is required", "string.pattern.base": "Username must contain at least one letter and can only include letters, numbers,", }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({ "string.base": "Email must be a text", "string.empty": "Email cannot be empty", "string.email": "Please provide a valid email address", "any.required": "Email is required", }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({ "string.base": "Mobile number must be a text", "string.empty": "Mobile number cannot be empty", "string.pattern.base": "Mobile number must be 10 digits", "any.required": "Mobile number is required" }),
    password: Joi.string().min(6).max(20).required().messages({ "string.base": "Password must be a text", "string.empty": "Password cannot be empty", "string.min": "Password must be at least 6 characters", "string.max": "Password must not exceed 20 characters", "any.required": "Password is required" }),
});


exports.loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

exports.adminIdValidationSchema = Joi.object({
    adminId: Joi.number().integer().positive().required().messages({ "number.base": "Admin ID must be a number", "number.integer": "Admin ID must be an integer", "number.positive": "Admin ID must be a positive number", "any.required": "Admin ID is required", }),
});


//?======================== lead ================================

exports.createLeadValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({ "string.base": "Name must be a text", "string.empty": "Name cannot be empty", "string.min": "Name should have at least 3 characters", "any.required": "Name is required", }),
    email: Joi.string().email().required().messages({ "string.email": "Invalid email format", "any.required": "Email is required", }),
    phone: Joi.string().pattern(/^[0-9]{10}$/).required().messages({ "string.pattern.base": "Phone must be a valid 10-digit number", "any.required": "Phone is required", }),
    company: Joi.string().max(100).allow("").optional(),
    status: Joi.string().valid('New', 'Contacted', 'Positive', 'Lost').required(),
    assignedTo: Joi.string().allow(null, "").optional(),
});


exports.leadIdValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages({ "number.base": "Lead ID must be a number", "number.integer": "Lead ID must be an integer", "any.required": "Lead ID is required", }),
});

//?======================  work ======================
exports.createWorkValidationSchema = Joi.object({
    leadName: Joi.string().required().messages({ "any.required": "Lead ID is required", "number.base": "Lead ID must be a number" }),
    quotationId: Joi.number().required(),
    startDate: Joi.date().required(),
    endDate: Joi.date().optional(),
    assignedTo: Joi.string().optional(),
    status: Joi.string().valid("Not Started", "In Progress", "Completed").optional(),
    description: Joi.string().optional(),
    notes: Joi.string().optional(),
});