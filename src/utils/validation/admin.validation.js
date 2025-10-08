const Joi = require("joi");

//?====================create admin=================

exports.createAdminValidationSchema = Joi.object({
    username: Joi.string().min(3).max(30).pattern(/^[A-Za-z ]+$/).required().messages({ "string.base": "Username must be a text", "string.empty": "Username cannot be empty", "string.min": "Username should have at least 3 characters", "string.max": "Username should not exceed 30 characters", "any.required": "Username is required", "string.pattern.base": "Username must contain only letters and spaces (A-Z, a-z)" }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({ "string.base": "Email must be a text", "string.empty": "Email cannot be empty", "string.email": "Please provide a valid email address", "any.required": "Email is required", }),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).required().messages({ "string.base": "Mobile number must be a text", "string.empty": "Mobile number cannot be empty", "string.pattern.base": "Mobile number must be 10 digits", "any.required": "Mobile number is required" }),
    password: Joi.string().min(6).max(20).required().messages({
        "string.base": "Password must be a text",
        "string.empty": "Password cannot be empty", "string.min": "Password must be at least 6 characters",
        "string.max": "Password must not exceed 20 characters", "any.required": "Password is required"
    }),
});


exports.loginValidationSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
});

exports.adminIdValidationSchema = Joi.object({
    adminId: Joi.number().integer().positive().required().messages({ "number.base": "Admin ID must be a number", "number.integer": "Admin ID must be an integer", "number.positive": "Admin ID must be a positive number", "any.required": "Admin ID is required", }),
});

//?====================== user =============================
exports.createUserValidationSchema = Joi.object({
    username: Joi.string().min(2).max(100).required(),
    email: Joi.string().email().required(),
    // password: Joi.string().min(6).required(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).optional().allow(null, ""),
    role: Joi.string().valid("Manager", "Sales Team", "Team Leader", "Director", "Tech Head", "CEO", "Sales Head", "HR", "Admin").optional(),
    status: Joi.string().valid("enable", "disable").optional(),
});

exports.updateUserValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    username: Joi.string().min(2).max(100).optional(),
    email: Joi.string().email().optional(),
    mobile: Joi.string().pattern(/^[0-9]{10}$/).optional().allow(null, ""),
    role: Joi.string().valid("Admin", "Manager", "Sales Team", "Team Leader", "Director", "Tech Head", "CEO", "Sales Head", "HR").optional(),
    status: Joi.string().valid("enable", "disable").optional(),
    password: Joi.string().min(6).optional(),
});

//?======================== lead ================================

exports.createLeadValidationSchema = Joi.object({
    name: Joi.string().min(3).max(50).required().messages({ "string.base": "Name must be a text", "string.empty": "Name cannot be empty", "string.min": "Name should have at least 3 characters", "string.max": "Name should not exceed 50 characters", "   .required": "Name is required" }),
    email: Joi.string().email().optional().allow(null, ""),
    mobile: Joi.string().optional().allow(null, ""),
    company: Joi.string().optional().allow(null, ""),
    status: Joi.string().valid("Approved", "Rejected", "Pending").default("Approved"),
    assignedTo: Joi.string().optional().allow(null, ""),
    leadSource: Joi.string().valid("Website", "Referral", "Cold Call", "Other").default("Other"),
    notes: Joi.string().optional().allow(null, ""),
    projectName: Joi.string().optional().allow(null, ""),
    startDate: Joi.alternatives().try(Joi.date().iso(), Joi.string().isoDate()),
    endDate: Joi.alternatives().try(Joi.date().iso(), Joi.string().isoDate()).optional().allow(null, ""),
    date: Joi.alternatives().try(Joi.date().iso(), Joi.string().isoDate()).optional().allow(null, ""),
    interestPercentage: Joi.alternatives().try(Joi.number().integer().min(0).max(100), Joi.string().pattern(/^([0-9]{1,2}|100)%$/)).optional().allow(null, "")
});


exports.leadIdValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages({ "number.base": "Lead ID must be a number", "number.integer": "Lead ID must be an integer", "any.required": "Lead ID is required", }),
});

//?==================== assign =======================
exports.createAssignValidationSchema = Joi.object({
    leadId: Joi.number().integer().positive().required().messages({
        "any.required": "Lead ID is required",
        "number.base": "Lead ID must be a number",
        "number.integer": "Lead ID must be an integer",
        "number.positive": "Lead ID must be positive",
    }),
    assignTo: Joi.number().integer().positive().required().messages({ "any.required": "AssignTo user ID is required", "number.base": "AssignTo must be a number", "number.integer": "AssignTo must be an integer", "number.positive": "AssignTo must be positive", })
});

//?======================  work ======================


exports.createWorkValidationSchema = Joi.object({
    workId: Joi.string().required().messages({
        "any.required": "Work ID is required",
        "string.empty": "Work ID cannot be empty"
    }),
    leadName: Joi.string().required().messages({
        "any.required": "Lead Name is required",
        "string.empty": "Lead Name cannot be empty"
    }),
    quotationNo: Joi.string().required().messages({
        "any.required": "Quotation No is required",
        "string.empty": "Quotation No cannot be empty"
    }),
    startDate: Joi.date().required().messages({
        "any.required": "Start Date is required",
        "date.base": "Start Date must be a valid date"
    }),
    endDate: Joi.date().optional(),
    assignedTo: Joi.string().optional(),
    status: Joi.string().valid("Not Started", "In Progress", "Completed").optional(),
    description: Joi.string().optional(),
    notes: Joi.string().optional()
});
//?========================quotation================================
exports.createQuotationValidationSchema = Joi.object({
    quotationNo: Joi.string().min(3).max(20).required(),
    clientName: Joi.string().min(3).max(50).required(),
    clientCompany: Joi.string().max(100).allow("").optional(),
    validUntil: Joi.date().greater('now').required(),
    amount: Joi.number().positive().required(),
    items: Joi.array().items(
        Joi.object({
            itemName: Joi.string().min(3).max(100).required(),
            description: Joi.string().min(3).max(200).required(),
            quantity: Joi.number().integer().positive().required(),
            price: Joi.number().positive().required(),
        })
    ).min(1).required(),
    status: Joi.string().valid('Draft', 'Sent', 'Accepted', 'Declined').required(),
});

exports.quotationIdValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
});
exports.updateQuotationValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    quotationNo: Joi.string().min(3).max(20).optional(),
    clientName: Joi.string().min(3).max(50).optional(),
    clientCompany: Joi.string().max(100).allow("").optional(),
    validUntil: Joi.date().greater('now').optional(),
    amount: Joi.number().positive().optional(),
    items: Joi.array().items(Joi.object({ itemName: Joi.string().min(3).max(100).optional(), description: Joi.string().min(3).max(200).optional(), quantity: Joi.number().integer().positive().optional(), price: Joi.number().positive().optional(), })).min(1).optional(),
    status: Joi.string().valid('Draft', 'Sent', 'Accepted', 'Declined').optional(),
});


//?======================== ceate follow up =============================
exports.createFollowUpValidationSchema = Joi.object({
    leadId: Joi.number().required().messages({ "any.required": "Lead ID is required", }),
    followUpDate: Joi.date().messages(),
    mode: Joi.string().valid("Call", "Email", "Meeting", "Message", "WhatsApp", "Other").required().messages({ "any.only": "Invalid follow-up mode", "any.required": "Follow-up mode is required", }),
    status: Joi.string().valid("Approved", "Rejected", "Pending").default("Pending"),
    // rejectionReason: Joi.when("status", { is: "Rejected", then: Joi.string().trim().required().messages({ "any.required": "Reason is required when status is Rejected", "string.empty": "Reason cannot be empty when status is Rejected", }), otherwise: Joi.string().optional().allow(null, ""), }),
    // createdBy: Joi.number().optional(),
});

//?================update follow up =====================
exports.updateFollowUpValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages({ "number.base": "Follow-up ID must be a number", "any.required": "Follow-up ID is required" }),
    leadId: Joi.number().integer().required(),
    followUpDate: Joi.date().optional().messages({ "date.base": "Follow-up date must be a valid date" }),
    nextFollowUpDate: Joi.date().optional().messages({ "date.base": "Next follow-up date must be a valid date" }),
    mode: Joi.string().valid("Call", "Email", "Meeting", "Message", "WhatsApp", "Other").optional().messages({ "string.base": "Mode must be a text", "any.only": "Mode must be one of Call, Email, Meeting, Message, WhatsApp, Other" }),
    notes: Joi.string().allow("", null).optional().messages({ "string.base": "Notes must be text" }),
    status: Joi.string().valid("Approved", "Rejected", "Pending").default("Approved"),
    responseText: Joi.string().allow("", null).optional().messages({ "string.base": "Response must be text" }),
    assignedTo: Joi.number().integer().optional().messages({ "number.base": "AssignedTo must be a user id (number)" }),
    projectName: Joi.string().allow(null, ""),
    clientName: Joi.string().allow(null, ""),
    followUpByName: Joi.string().allow(null, ""),
});

//?========================approve followup===================
exports.approveFollowUpValidationSchema = Joi.object({
    id: Joi.number().integer().required().messages({ "number.base": "Follow-up ID must be a number", "any.required": "Follow-up ID is required" }),
    approvedBy: Joi.number().integer().required().messages({ "number.base": "ApprovedBy must be a number", "any.required": "ApprovedBy is required" })
});

//?=================== payment ============================
exports.createPaymentValidationSchema = Joi.object({
    projectName: Joi.string().required(),
    clientName: Joi.string().required(),
    paymentId: Joi.string(),
    installmentNo: Joi.number().integer().min(1),
    dueDate: Joi.date(),
    amount: Joi.number().positive(),
    paymentMethod: Joi.string().valid("Cash", "Card", "UPI", "Bank Transfer", "Cheque").required(),
    installmentCount: Joi.number().integer().min(1),
    paidAmount: Joi.number().positive().required(),
    remainingAmount: Joi.number().min(0).required(),
    givenTo: Joi.string().trim().required(),
    totalAmount: Joi.number().positive().required(),
    notes: Joi.string().allow(null, ""),
    status: Joi.string().valid("Pending", "Partially Paid", "Completed").optional(),
});

exports.updatePaymentValidationSchema = Joi.object({
    id: Joi.number().integer().required(),
    projectName: Joi.string().required(),
    clientName: Joi.string().required(),
    paymentId: Joi.string(),
    installmentNo: Joi.number().integer().min(1),
    dueDate: Joi.date(),
    amount: Joi.number().positive().required(),
    paymentMethod: Joi.string().valid("Cash", "Card", "UPI", "Bank Transfer", "Cheque").required(),
    installmentCount: Joi.number().integer().min(1),
    paidAmount: Joi.number().positive().required(),
    remainingAmount: Joi.number().min(0).required(),
    givenTo: Joi.string().trim().required(),
    totalAmount: Joi.number().positive().required(),
    notes: Joi.string().allow(null, ""),
    status: Joi.string().valid("Pending", "Partially Paid", "Completed").optional(),
});

exports.downloadPaymentReceiptValidationSchema = Joi.object({
    paymentId: Joi.string().required().messages({ "string.empty": "Payment ID is required", "any.required": "Payment ID is required", }),
});

//?============================= notification =================================
exports.createNotificationValidationSchema = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    type: Joi.string().valid("INFO", "WARNING", "SUCCESS", "ERROR").required(),
    recipientId: Joi.number().integer().required(),
    createdBy: Joi.number().integer().required(),
    date: Joi.date().iso().required()
});
exports.getNotificationsValidationSchema = Joi.object({
    userId: Joi.number().integer().required()
});

exports.markAsReadValidationSchema = Joi.object({
    id: Joi.number().integer().required()
});

//?================== assignlead ===========================
exports.updateLeadAssignValidationSchema = Joi.object({
    leadId: Joi.number().integer().required().messages({
        "any.required": "leadId is required",
        "number.base": "leadId must be a number"
    }),
    assignTo: Joi.number().integer().optional().messages({
        "number.base": "assignTo must be a number"
    }),
    assignByUser: Joi.number().integer().optional().messages({
        "number.base": "assignByUser must be a number"
    })
});