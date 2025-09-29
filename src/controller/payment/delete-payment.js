const paymentService = require("../../services/payment.service");



const deletePayment = async (req, res) => {
    try {
        const { id } = req.body;
        const deleted = await paymentService.deletePayment(id);

        if (!deleted) {
            return res.status(200).json({ status: "FAILED", message: "Payment not found or delete failed" });
        }

        return res.status(200).json({ status: "SUCCESS", message: "Payment deleted successfully" });

    } catch (error) {
        return res.status(500).json({ status: "FAILED", message: error.message });
    }
};



module.exports = deletePayment;
