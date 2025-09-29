const leadServices = require("../../services/lead.service");
const { createLeadValidationSchema } = require("../../utils/validation/admin.validation");

const createLead = async (request, response) => {
    try {
        // Extract data from request body
        const { name, email, mobile, company, status, assignedTo, leadSource, notes, projectName, interestPercentage } = request.body;

        // ================= Validation =================
        const validationResult = createLeadValidationSchema.validate(
            { name, email, mobile, company, status, assignedTo, leadSource, notes, projectName, interestPercentage },
            { abortEarly: true }
        );
        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        // ================= Check if lead already exists =================
        const isLeadExist = await leadServices.getLeadByEmail(email);
        if (isLeadExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead already exists with this email",
            });
        }

        // ================= Insert Data =================
        const dataToInsert = {
            name,
            email,
            mobile,
            company,
            status: status || "new", // default status
            assignedTo: assignedTo || null,
            leadSource,
            notes,
            projectName,
            interestPercentage
        };

        const result = await leadServices.createLead(dataToInsert);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Lead add successfully",
                data: result,
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to add Lead, please try again",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = createLead;
