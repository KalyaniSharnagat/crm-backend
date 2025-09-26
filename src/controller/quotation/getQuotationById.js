const quotationService = require("../../services/quotation.service");
const { quotationIdValidationSchema } = require("../../utils/validation/admin.validation");

const getQuotationById = async (request, response) => {
    try {
        const { id } = request.body;

        // Check if ID is provided
        const validationResult = await quotationIdValidationSchema.validate({ id }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        const result = await quotationService.getQuotationById(id);
        if (result) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Quotation fetched successfully",
                data: result
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Quotation not found",
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

module.exports = getQuotationById;
