const paymentService = require("../../services/payment.service");


const getPaymentList = async (request, response) => {
    try {

        const { page = 1, searchString } = request.body;

        const result = await paymentService.getPaymentList(page, searchString);

        if (result?.totalPages > 0) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Payments fetched successfully",
                ...result
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "No payments found",
            });
            return;
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = getPaymentList;
