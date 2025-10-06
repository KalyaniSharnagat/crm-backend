const notificationService = require('../../services/notification.service');

const QuotationNotification = async (request, response) => {
    try {
        const quotationData = request.body;
        const result = await notificationService.quotationAdded(quotationData);

        response.status(200).json({
            status: "SUCCESS",
            message: "Quotation notification sent Successfully",
            data: result,
        });
    } catch (error) {
        console.error("Error sending quotation notification:", error);
        response.status(500).json({
            status: "FAILED",
            message: "Error sending quotation notification",
            error: error.message,
        });
    }
};

module.exports = QuotationNotification;
