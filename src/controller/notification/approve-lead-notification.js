const notificationService = require('../../services/notification.service');

const ApproveLeadNotification = async (request, response) => {
    try {
        const leadData = request.body;

        const result = await notificationService.leadApproved(leadData);

        response.status(200).json({
            status: "SUCCESS",
            message: "Lead approval notification sent Successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error sending lead approval notification:", error);
        response.status(500).json({
            status: "FAILED",
            message: "Error sending lead approval notification",
            error: error.message,
        });
    }
};

module.exports = ApproveLeadNotification;
