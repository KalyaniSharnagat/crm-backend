const path = require("path");
const { createFollowUpValidationSchema } = require("../../utils/validation/admin.validation");
const followUpService = require("../../services/followup.service");
const leadService = require("../../services/lead.service");

const addFollowUp = async (request, response) => {
    try {

        const file = request.file;

        const folloupDetails = JSON.parse(request.body.folloupDetails);
        const { leadId, nextFollowUpDate, followUpByName, remark, mode, status } = folloupDetails;

        const validationResult = await createFollowUpValidationSchema.validate(
            { leadId, nextFollowUpDate, followUpByName, remark, mode, status },
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

        const followUp = await followUpService.createFollowUp({
            leadId,
            nextFollowUpDate,
            followUpByName,
            remark,
            mode,
            status,
        });

        if (!followUp) {
            return response.status(500).json({
                status: "FAILED",
                message: "Failed to create follow-up, please try again!",
            });
        }

        let uploadedFileInfo = null;
        if (file) {
            uploadedFileInfo = {
                fileUrl: path.join("public/followup", file.filename),
                // Id: followUp.id,
                // type: file.mimetype.startsWith("image/") ? "image" : "pdf",
            };

            // Save file info if needed in DB
            if (followUpService.savefollowupImages) {
                await followUpService.savefollowupImages([uploadedFileInfo]);
            }
        }

        return response.status(200).json({
            status: "SUCCESS",
            message: "Follow-up added successfully",
            data: {
                followUp,
                file: uploadedFileInfo,
            },
        });
    } catch (error) {
        console.error("❌ Error adding follow-up:", error);
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = addFollowUp;
