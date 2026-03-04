const paymentService = require("../../services/payment.service");

const deletePayment = async (request, response) => {
    try {
        const { id } = request.body;
        const deleted = await paymentService.deletePayment(id);

        if (!deleted) {
            return response.status(200).json({ status: "FAILED", message: "Payment not found or delete failed" });
        }

        return response.status(200).json({ status: "SUCCESS", message: "Payment deleted successfully" });

    } catch (error) {
        return response.status(500).json({ status: "FAILED", message: error.message });
    }
};

module.exports = deletePayment;
