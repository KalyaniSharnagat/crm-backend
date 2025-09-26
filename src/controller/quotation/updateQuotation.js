const quotationService = require("../../services/quotation.service");
const { updateQuotationValidationSchema } = require("../../utils/validation/admin.validation");

const updateQuotation = async (request, response) => {
    try {
        const { id, quotationNo, clientName, clientCompany, validUntil, amount, items, status } = request.body;

        // Check validation
        const validationResult = await updateQuotationValidationSchema.validate({ id, quotationNo, clientName, clientCompany, validUntil, amount, items, status }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        // Check if quotation exists
        const isQuotationExist = await quotationService.getQuotationById(id);
        if (!isQuotationExist) {
            response.status(200).json({
                status: "FAILED",
                message: "Quotation not found",
            });
            return;
        }

        const dataToUpdate = {
            quotationNo: quotationNo?.toUpperCase(),
            clientName,
            clientCompany: clientCompany || "",
            validUntil: new Date(validUntil),
            amount: parseFloat(amount),
            items: items || [],
            status: status || "Draft",
            updatedBy: request.user?.id || "admin",
        }

        const result = await quotationService.updateQuotation(id, dataToUpdate);
        if (result) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Quotation updated successfully",
            });
            return;
        } else {
            response.status(400).json({
                status: "FAILED",
                message: "Failed to update quotation, Please try again!",
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

module.exports = updateQuotation;
