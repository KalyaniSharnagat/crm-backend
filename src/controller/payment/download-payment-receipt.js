const paymentService = require("../../services/payment.service");
const { downloadPaymentReceiptValidationSchema } = require("../../utils/validation/admin.validation");

const downloadPaymentReceipt = async (request, response) => {
    try {
        const { paymentId } = request.body;

        // Validation
        const { error } = downloadPaymentReceiptValidationSchema.validate({ paymentId });
        if (error) {
            return response.status(200).json({
                status: "FAILED",
                message: error.details[0].message,
            });
        }

        const result = await paymentService.downloadReceipt(paymentId);
        if (!result) {
            return response.status(200).json({ status: "FAILED", message: "Payment not found" });
        }
        paymentService.generateReceiptPDF(result.payment, response);


        // PDF generate karke directly download karta hai
        paymentService.generateReceiptPDF(result.payment, response);

    } catch (err) {
        return response.status(500).json({ status: "FAILED", message: err.message });
    }
};

module.exports = downloadPaymentReceipt;
