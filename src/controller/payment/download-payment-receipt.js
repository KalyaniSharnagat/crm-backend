const paymentService = require("../../services/payment.service");
const { downloadPaymentReceiptValidationSchema } = require("../../utils/validation/admin.validation");

const downloadPaymentReceipt = async (req, res) => {
    try {
        const { paymentId } = req.body;

        // Validation
        const { error } = downloadPaymentReceiptValidationSchema.validate({ paymentId });
        if (error) {
            return res.status(200).json({
                status: "FAILED",
                message: error.details[0].message,
            });
        }

        const result = await paymentService.downloadReceipt(paymentId);
        if (!result) {
            return res.status(200).json({ status: "FAILED", message: "Payment not found" });
        }
        paymentService.generateReceiptPDF(result.payment, res);


        // PDF generate karke directly download karta hai
        paymentService.generateReceiptPDF(result.payment, res);

    } catch (err) {
        return res.status(500).json({ status: "FAILED", message: err.message });
    }
};

module.exports = downloadPaymentReceipt;
