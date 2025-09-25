// controllers/lead.controller.js
const leadServices = require("../../services/lead.service");
const { leadIdValidationSchema } = require("../../utils/validation/admin.validation");

const getLeadById = async (req, res) => {
    try {
        // Extract lead ID from request body
        const { id } = req.body;

        // Validate ID
        const validationResult = await leadIdValidationSchema.validate({ id }, { abortEarly: true });
        if (validationResult.error) {
            return res.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
        }

        // Fetch lead from service
        const lead = await leadServices.getLeadById(id);

        if (lead) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Lead fetched successfully",
                data: lead, // no sanitization
            });
        } else {
            return res.status(200).json({
                status: "FAILED",
                message: "Lead not found with this ID, please try again",
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getLeadById;
