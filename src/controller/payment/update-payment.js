
const paymentService = require("../../services/payment.service");
const { updatePaymentValidationSchema } = require("../../utils/validation/admin.validation");


const updatePayment = async (request, response) => {
    try {
        // extract data from request body
        const { id, projectName, clientName, installmentNo, dueDate, amount, paymentMethod, installmentCount, totalAmount, notes, status, paidDate } = request.body;

        // check validation
        const validationResult = await updatePaymentValidationSchema.validate(
            { id, projectName, clientName, installmentNo, dueDate, amount, paymentMethod, installmentCount, totalAmount, notes, status, paidDate },
            { abortEarly: true }
        );

        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
            return;
        }

        // check if payment exists
        const isPaymentExist = await paymentService.getPaymentById(id);
        if (!isPaymentExist) {
            response.status(200).json({
                status: "FAILED",
                message: "Payment not found with this id, Please try again",
            });
            return;
        }

        const dataToUpdate = {
            projectName,
            clientName,
            installmentNo,
            dueDate,
            amount,
            paymentMethod,
            installmentCount,
            totalAmount,
            notes,
            status,
            paidDate
        };

        // update payment in DB & send response
        const result = await paymentService.updatePayment(id, dataToUpdate);
        if (result) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Payment updated successfully",
                data: result
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to update Payment, Please try again!",
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

module.exports = updatePayment;
