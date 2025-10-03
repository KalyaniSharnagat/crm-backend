const notificationService = require('../../services/notification.service');

const ApproveLeadNotification = async (req, res) => {
    try {
        const leadData = req.body;

        const result = await notificationService.leadApproved(leadData);

        res.status(200).json({
            status: "SUCCESS",
            message: "Lead approval notification sent",
            data: result,
        });
    } catch (error) {
        console.error("Error sending lead approval notification:", error);
        res.status(500).json({
            status: "FAILED",
            message: "Error sending lead approval notification",
            error: error.message,
        });
    }
};

module.exports = ApproveLeadNotification;
