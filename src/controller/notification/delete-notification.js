const notificationService = require('../../services/notification.service');

const DeleteNotification = async (request, response) => {
    try {
        const data = request.body;

        if (!data || !data.type || !data.id) {
            return res.status(400).json({
                status: "FAILED",
                message: "Missing required fields: type or id",
            });
        }

        const result = await notificationService.deleteNotification(data);

        response.status(200).json({
            status: "SUCCESS",
            message: "Delete notification sent Successfully.",
            data: result,
        });
    } catch (error) {
        console.error("Error sending delete notification:", error);
        response.status(500).json({
            status: "FAILED",
            message: "Error sending delete notification",
            error: error.message,
        });
    }
};

module.exports = DeleteNotification;
