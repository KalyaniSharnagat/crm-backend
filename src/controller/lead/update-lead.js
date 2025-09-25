const leadServices = require("../../services/lead.service");
const { createLeadValidationSchema } = require("../../utils/validation/admin.validation");

const updateLead = async (request, response) => {
    try {
        // Extract data from request body
        const { id, name, email, phone, company, status, assignedTo } = request.body;

        if (!id) {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead ID is required to update",
            });
        }

        // ================= Validation =================
        const validationResult = createLeadValidationSchema.validate(
            { name, email, phone, company, status, assignedTo },
            { abortEarly: true }
        );
        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        // ================= Map status to DB ENUM =================
        let dbStatus;
        if (status) {
            switch (status.toLowerCase()) {
                case "new":
                    dbStatus = "New";
                    break;
                case "contacted":
                    dbStatus = "Contacted";
                    break;
                case "qualified":
                case "positive":
                    dbStatus = "Positive";
                    break;
                case "lost":
                    dbStatus = "Lost";
                    break;
                default:
                    dbStatus = "New";
            }
        }

        // ================= Prepare data to update =================
        const dataToUpdate = {
            name,
            email,
            phone,
            company,
            status: dbStatus,
            assignedTo: assignedTo || null,
        };

        // ================= Update lead =================
        const result = await leadServices.updateLead(id, dataToUpdate);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Lead updated successfully",
                data: result,
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to update Lead, please check the ID",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updateLead;
