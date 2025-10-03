const quotationService = require("../../services/quotation.service");
const { updateQuotationValidationSchema } = require("../../utils/validation/admin.validation");

const updateQuotation = async (request, response) => {
    try {
        const { id, quotationNo, clientName, clientCompany, validUntil, amount, items, status } = request.body;

        // Validation
        const validationResult = await updateQuotationValidationSchema.validate(
            { id, quotationNo, clientName, clientCompany, validUntil, amount, items, status },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
        }

        const isQuotationExist = await quotationService.getQuotationById(id);
        if (!isQuotationExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Quotation not found",
            });
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
        };

        const updatedQuotation = await quotationService.updateQuotation(id, dataToUpdate);

        if (updatedQuotation) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Quotation updated successfully",
                data: updatedQuotation,
            });
        } else {
            return response.status(400).json({
                status: "FAILED",
                message: "Failed to update quotation, Please try again!",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updateQuotation;
