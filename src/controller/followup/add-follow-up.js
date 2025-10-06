const followUpService = require("../../services/followup.service");
const leadService = require("../../services/lead.service");
const { createFollowUpValidationSchema } = require("../../utils/validation/admin.validation");

const addFollowUp = async (request, response) => {
    try {
        const { leadId, followUpDate, nextFollowUpDate, mode, followUpByName, status, callNumber, whatsappNumber, rejectionReason, createdBy: bodyCreatedBy } = request.body;

        const createdBy = request.user?.id || bodyCreatedBy;
        if (!createdBy) {
            return response.status(400).json({
                status: "FAILED",
                message: "Created By is required",
            });
        }

        const validationResult = await createFollowUpValidationSchema.validate(
            { leadId, followUpDate, mode, createdBy, status, rejectionReason },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(400).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        const lead = await leadService.getLeadById(leadId);
        if (!lead) {
            return response.status(404).json({
                status: "FAILED",
                message: "Lead not found with this ID",
            });
        }

        const isFollowUpExist = await followUpService.getFollowUpByLeadAndDate(leadId, followUpDate);
        if (isFollowUpExist) {
            return response.status(400).json({
                status: "FAILED",
                message: "Follow-up already exists for this Lead on the same date",
            });
        }
        // Validate status
        const allowedStatus = ["Approved", "Rejected", "Pending"];
        const finalStatus = status && allowedStatus.includes(status) ? status : "Pending";

        if (finalStatus === "Rejected") {
            const trimmedReason = rejectionReason ? rejectionReason.toString().trim() : "";
            if (!trimmedReason) {
                return response.status(400).json({
                    status: "FAILED",
                    message: "rejectionReason is required when status is Rejected",
                });
            }
        }

        const dataToInsert = {
            leadId,
            projectName: lead.projectName,
            clientName: lead.name,
            followUpByName,
            followUpDate,
            nextFollowUpDate,
            mode,
            callNumber,
            whatsappNumber,
            status: finalStatus,
            rejectionReason: rejectionReason || null,
            createdBy,
        };

        const result = await followUpService.createFollowUp(dataToInsert);

        return response.status(200).json({
            status: "SUCCESS",
            message: "Follow-up added successfully",
            data: result,
        });

    } catch (error) {
        console.error("Error adding follow-up:", error);
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = addFollowUp;
