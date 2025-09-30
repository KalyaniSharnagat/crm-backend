const { createQuotationValidationSchema } = require("../../utils/validation/admin.validation");
// const quotationServices = require("../../services/quotation.service");
const notificationService = require("../../services/notification.service");

const addQuotation = async (request, response) => {
    try {
        const { quotationNo, amount, leadId, clientName } = request.body;

        // Validation
        const validationResult = createQuotationValidationSchema.validate(
            { quotationNo, amount, leadId, clientName },
            { abortEarly: true }
        );
        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        // Check if quotation already exists
        const isQuotationExist = await quotationServices.getQuotationByNo(quotationNo);
        if (isQuotationExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Quotation already exists with this number",
            });
        }

        // Insert Quotation
        const dataToInsert = { quotationNo, amount, leadId, clientName };
        const result = await quotationServices.createQuotation(dataToInsert);

        // Notification after successful creation
        await notificationService.quotationAdded(result, request.user?.id);

        return response.status(200).json({
            status: "SUCCESS",
            message: "Quotation added successfully",
            data: result,
        });
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = addQuotation;
