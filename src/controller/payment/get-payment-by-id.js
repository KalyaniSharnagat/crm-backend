const paymentService = require("../../services/payment.service");


const getPaymentById = async (request, response) => {
    try {
        const { id } = request.body;
        const payment = await paymentService.getPaymentById(id);

        if (!payment) {
            return response.status(200).json({ status: "FAILED", message: "Payment not found" });
        }

        return response.status(200).json({ status: "SUCCESS", data: payment });

    } catch (error) {
        return response.status(500).json({ status: "FAILED", message: error.message });
    }
};

module.exports = getPaymentById;
