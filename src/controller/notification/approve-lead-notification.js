
const leadService = require("../../services/lead.service");
const notificationService = require("../../services/notification.service");


const approveLead = async (request, response) => {
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

        // Update lead status first
        const updatedLead = await leadService.updateLead(leadId, { status: "Approved" });

        // Notification after update
        await notificationService.leadApproved(updatedLead, request.user?.id);

        return response.status(200).json({
            status: "SUCCESS",
            message: "Lead approved successfully",
            data: updatedLead,
        });
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = approveLead;
