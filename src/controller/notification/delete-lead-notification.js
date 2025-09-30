const leadService = require("../../services/lead.service");

const deleteLead = async (request, response) => {
    try {
        const { leadId } = request.params;

        // Check if lead exists
        const lead = await leadService.getLeadById(leadId);
        if (!lead) {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead not found",
            });
        }

        // Delete lead first
        await leadService.deleteLead(leadId);

        // Notification after successful deletion
        await notificationService.leadDeleted(lead, request.user?.id);

        return response.status(200).json({
            status: "SUCCESS",
            message: "Lead deleted successfully",
        });
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = deleteLead;
