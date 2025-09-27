const followUpService = require("../../services/followup.service");
const { createFollowUpValidationSchema } = require("../../utils/validation/admin.validation");

const addFollowUp = async (request, response) => {
    try {
        const { leadId, quotationId, followUpDate, nextFollowUpDate, mode, notes, assignedTo, priority, response: customerResponse, outcome, callNumber, whatsappNumber, emailId, attachment, attachmentMultiple, location, createdBy } = request.body;

        //  Validation
        const validationResult = await createFollowUpValidationSchema.validate(
            { leadId, followUpDate, mode, createdBy },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }
        const isFollowUpExist = await followUpService.getFollowUpByLeadAndDate(leadId, followUpDate);
        if (isFollowUpExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Follow-up already exists for this Lead on the same date",
            });
        }

        const dataToInsert = { leadId, quotationId, followUpDate, nextFollowUpDate, mode, notes, assignedTo, priority, response: customerResponse, outcome, callNumber, whatsappNumber, emailId, attachment, attachmentMultiple, location, createdBy, status: "Scheduled", notifyAdmin: false, notifyAssignedUser: false, reminderSent: false, isActive: true };

        // Insert FollowUp
        const result = await followUpService.createFollowUp(dataToInsert);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Follow-up created successfully",
                data: {
                    id: result.id,
                    leadId: result.leadId,
                    followUpDate: result.followUpDate,
                    mode: result.mode,
                    status: result.status,
                    assignedTo: result.assignedTo,
                    priority: result.priority,
                    createdBy: result.createdBy
                }
            });
        }

        return response.status(200).json({
            status: "FAILED",
            message: "Failed to create follow-up, Please try again!",
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = addFollowUp;
