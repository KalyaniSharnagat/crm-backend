const notificationService = require('../../services/notification.service');

const leadAddedNotification = async (request, response) => {
    try {
        const leadData = request.body;
        const result = await notificationService.leadAdded(leadData);

        response.status(200).json({
            status: "SUCCESS",
            message: "Lead notification sent Successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error creating lead notification:", error);
        response.status(500).json({
            status: "FAILED",
            message: "Error creating lead notification",
            error: error.message,
        });
    }
};

module.exports = leadAddedNotification;
