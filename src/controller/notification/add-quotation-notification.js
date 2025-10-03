const notificationService = require('../../services/notification.service');

const QuotationNotification = async (req, res) => {
    try {
        const quotationData = req.body;

        const result = await notificationService.quotationAdded(quotationData);

        res.status(200).json({
            status: "SUCCESS",
            message: "Quotation notification sent",
            data: result,
        });
    } catch (error) {
        console.error("Error sending quotation notification:", error);
        res.status(500).json({
            status: "FAILED",
            message: "Error sending quotation notification",
            error: error.message,
        });
    }
};

module.exports = QuotationNotification;
