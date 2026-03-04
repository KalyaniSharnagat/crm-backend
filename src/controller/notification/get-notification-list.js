const notificationServices = require("../../services/notification.service");

const getNotificationList = async (req, res) => {
    try {
        const leadId = req.leadId; // coming from auth middleware
        const { searchString = "", page = 1, limit = 10 } = req.body; // defaults

        // Fetch notifications with search and pagination
        const notificationData = await notificationServices.getNotification(leadId, searchString, page, limit);

        // Mark all fetched notifications as seen
        await notificationServices.markNotificationAsSeen(leadId);

        // Get count of unseen notifications
        const unseenCount = await notificationServices.getNotificationCount(leadId);

        // Emit unseen count via socket
        if (req.io) {
            req.io.emit("notificationCount", { unseenCount });
        }

        // Return response
        if (notificationData?.notifications?.length > 0) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Notifications fetched successfully",
                data: notificationData,
                unseenCount,
            });
        }

        return res.status(404).json({
            status: "FAILED",
            message: "No notifications available",
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getNotificationList