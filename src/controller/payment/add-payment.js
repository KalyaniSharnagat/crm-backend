
const paymentService = require("../../services/payment.service");
const { createPaymentValidationSchema } = require("../../utils/validation/admin.validation");
const generatePaymentId = require("../../utils/helper/generate-payment-id")


const addPayment = async (request, response) => {
    try {
        const { projectName, clientName, paymentId, installmentNo, dueDate, amount, paymentMethod, installmentCount, givenTo, paidAmount, remainingAmount, totalAmount, notes } = request.body;

        // validation
        const validationResult = await createPaymentValidationSchema.validate(
            { projectName, clientName, paymentId, installmentNo, dueDate, amount, paymentMethod, installmentCount, givenTo, paidAmount, remainingAmount, totalAmount, notes },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        // normalize payment method
        const allowedMethods = ["Cash", "Card", "UPI", "Bank Transfer", "Cheque"];
        const method = allowedMethods.find(m => m.toLowerCase() === paymentMethod?.trim().toLowerCase());
        if (!method) {
            return response.status(200).json({
                status: "FAILED",
                message: `Invalid payment method. Allowed: ${allowedMethods.join(", ")}`
            });
        }

        // prepare data
        const dataToInsert = { projectName, clientName, paymentId: paymentId || generatePaymentId(), installmentNo, dueDate, amount, paymentMethod: method, installmentCount, givenTo, paidAmount, remainingAmount, totalAmount, notes, status: "Pending" };

        const result = await paymentService.createPayment(dataToInsert);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Payment created successfully",
                data: result
            });
        }

        return response.status(200).json({
            status: "FAILED",
            message: "Failed to create payment, Please try again!"
        });

    } catch (error) {
        return response.status(500).json({ status: "FAILED", message: error.message });
    }
};

module.exports = addPayment;
