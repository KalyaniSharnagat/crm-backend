const notificationService = require('../../services/notification.service');

const leadAddedNotification = async (req, res) => {
    try {
        const leadData = req.body;
        const result = await notificationService.leadAdded(leadData);

        res.status(200).json({
            status: "SUCCESS",
            message: "Lead notification sent",
            data: result,
        });
    } catch (error) {
        console.error("Error creating lead notification:", error);
        res.status(500).json({
            status: "FAILED",
            message: "Error creating lead notification",
            error: error.message,
        });
    }
};

module.exports = leadAddedNotification;
