const quotationService = require("../../services/quotation.service");
const { quotationIdValidationSchema } = require("../../utils/validation/admin.validation");

const deleteQuotation = async (request, response) => {
    try {
        const { id } = request.body;

        // Check if quotation exists
        const validationResult = await quotationIdValidationSchema.validate({ id }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        const result = await quotationService.deleteQuotation(id);
        if (result) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Quotation deleted successfully",
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to delete quotation, Please try again!",
            });
            return;
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
};

module.exports = deleteQuotation;
