const notificationService = require("../../services/notification.service");

const notificationList = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const pageNumber = parseInt(page, 10);
        const limitNumber = parseInt(limit, 10);

        const { notifications, totalCount } = await notificationService.getNotificationList({
            page: pageNumber,
            limit: limitNumber,
            search,
        });

        res.status(200).json({
            status: "SUCCESS",
            message: "Notifications fetched successfully.",
            data: {
                notifications,
                pagination: {
                    page: pageNumber,
                    limit: limitNumber,
                    totalPages: Math.ceil(totalCount / limitNumber),
                    totalCount,
                },
            },
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

module.exports = notificationList;
