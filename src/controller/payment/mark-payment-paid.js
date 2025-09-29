const paymentService = require("../../services/payment.service");


const markPaymentPaid = async (request, response) => {
    try {
        const { id } = request.body;
        const { paidDate, amountPaid, paymentMethod } = request.body;

        const result = await paymentService.markPaymentPaid(id, { paidDate, amountPaid, paymentMethod });

        if (!result) {
            return response.status(200).json({ status: "FAILED", message: "Payment not found or update failed" });
        }

        return response.status(200).json({
            status: "SUCCESS",
            message: "Payment marked as paid",
            data: result
        });

    } catch (error) {
        return response.status(500).json({ status: "FAILED", message: error.message });
    }
};

module.exports = markPaymentPaid;
