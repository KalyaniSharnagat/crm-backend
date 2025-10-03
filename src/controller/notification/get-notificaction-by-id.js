const notificationService = require('../../services/notification.service');

const getNotificationById = async (request, response) => {
    try {
        const { id } = request.body;

        if (!id) {
            return res.status(400).json({
                status: "FAILED",
                message: "Notification ID is required"
            });
        }

        const notification = await notificationService.getNotificationById(id);

        response.status(200).json({
            status: "SUCCESS",
            message: "Notification fetched successfully",
            data: notification
        });
    } catch (error) {
        console.error("Error fetching notification by id:", error);
        response.status(500).json({
            status: "FAILED",
            message: "Error fetching notification",
            error: error.message
        });
    }
};

module.exports = getNotificationById;
