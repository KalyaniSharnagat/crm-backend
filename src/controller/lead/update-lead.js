const leadServices = require("../../services/lead.service");
const { createLeadValidationSchema } = require("../../utils/validation/admin.validation");

const updateLead = async (request, response) => {
    try {
        // Extract data from request body
        const { id, name, email, mobile, company, status, assignedTo, leadSource, notes, projectName, interestPercentage } = request.body;

        // ================= Check ID =================
        if (!id) {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead ID is required to update",
            });
        }

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

        // ================= Check if lead exists =================
        const isLeadExist = await leadServices.getLeadById(id);
        if (!isLeadExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead not found with this ID",
            });
        }

        // ================= Map status to DB ENUM =================
        const mapStatusToDB = (status) => {
            if (!status) return undefined;
            const map = { new: "New", contacted: "Contacted", positive: "Positive", qualified: "Positive", lost: "Lost" };
            return map[status.toLowerCase()] || "New";
        };

        const dbStatus = mapStatusToDB(status);

        // ================= Prepare data to update =================
        const dataToUpdate = {
            name,
            email,
            mobile,
            company,
            status: dbStatus,
            assignedTo: assignedTo || null,
            leadSource,
            notes,
            projectName,
            interestPercentage
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
                message: "Failed to update Lead, please try again",
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
