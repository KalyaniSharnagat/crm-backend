const notificationService = require('../../services/notification.service');

const getAllNotification = async (request, response) => {
    try {
        const allNotifications = await notificationService.getAllNotifications();

        response.status(200).json({
            status: "SUCCESS",
            message: "All notifications fetched successfully",
            data: allNotifications,
        });
    } catch (error) {
        console.error("Error fetching notifications:", error);
        res.status(500).json({
            status: "FAILED",
            message: "Error fetching notifications",
            error: error.message,
        });
    }
};

module.exports = getAllNotification;
