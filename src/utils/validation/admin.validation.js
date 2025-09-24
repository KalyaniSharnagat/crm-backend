const Joi = require("joi");

//?====================create admin=================

exports.createAdminValidationSchema = Joi.object({
    username: Joi.string().min(3) .max(30) .required() .messages({"string.base": "Username must be a text","string.empty": "Username cannot be empty","string.min": "Username should have at least 3 characters","string.max": "Username should not exceed 30 characters","any.required": "Username is required"}),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({ "string.base": "Email must be a text", "string.empty": "Email cannot be empty", "string.email": "Please provide a valid email address","any.required": "Email is required"}),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({ "string.base": "Mobile number must be a text",    "string.empty": "Mobile number cannot be empty",    "string.pattern.base": "Mobile number must be 10 digits",    "any.required": "Mobile number is required" }),
    password: Joi.string()  .min(6)  .max(20)  .required().messages({ "string.base": "Password must be a text", "string.empty": "Password cannot be empty", "string.min": "Password must be at least 6 characters","string.max": "Password must not exceed 20 characters",  "any.required": "Password is required"}),
});


exports.adminLoginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

