const notificationService = require('../../services/notification.service');

const getNotificationCount = async (request, response) => {
    try {
        // Service call — sabhi notifications ka count fetch karega
        const count = await notificationService.getNotificationCount();

        if (count !== undefined && count !== null) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Notification count fetched successfully.",
                data: {
                    notificationCount: count || 0
                }
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "No notifications found.",
                data: {
                    notificationCount: 0
                }
            });
        }

    } catch (error) {
        console.error("Error fetching notification count:", error);
        return response.status(500).json({
            status: "FAILED",
            message: "Error fetching notification count",
            error: error.message
        });
    }
};

module.exports = getNotificationCount;
