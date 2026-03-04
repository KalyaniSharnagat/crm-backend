const paymentService = require("../../services/payment.service");

const getPayments = async (request, response) => {
    try {
        const { status, clientName, projectName } = request.query;

        const filters = {};
        if (status) filters.status = status;
        if (clientName) filters.clientName = clientName;
        if (projectName) filters.projectName = projectName;

        const payments = await paymentService.getallPayments(filters);

        if (payments?.length > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Payments fetched successfully",
                data: payments
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "No payments found",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = getPayments;
