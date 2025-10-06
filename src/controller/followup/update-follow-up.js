const followUpService = require("../../services/followup.service");
const leadServices = require("../../services/lead.service");
const { updateFollowUpValidationSchema } = require("../../utils/validation/admin.validation");

const updateFollowUp = async (request, response) => {
    try {
        const { id, leadId, projectName, clientName, followUpByName, followUpDate, nextFollowUpDate, mode, status, } = request.body;

        // Validation
        const validationResult = await updateFollowUpValidationSchema.validate(
            { id, leadId, projectName, clientName, followUpByName, followUpDate, nextFollowUpDate, mode, status },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        // Check followup exist
        const isFollowUpExist = await followUpService.getFollowUpById(id);
        if (!isFollowUpExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Follow-up not found",
            });
        }

        // ================= Check if lead exists =================


        const isLeadExist = await leadServices.getLeadById(leadId);
        console.log("--------", isLeadExist);
        if (!isLeadExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead not found with this ID",
            });
        }


        // Prepare update data
        const dataToUpdate = { projectName, clientName, followUpByName, followUpDate, nextFollowUpDate, mode, status };

        const result = await followUpService.updateFollowUp(id, dataToUpdate);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Follow-up updated successfully",
                data: result,
            });
        }

        return response.status(200).json({
            status: "FAILED",
            message: "Failed to update follow-up, Please try again!",
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updateFollowUp;
