const quotationService = require("../../services/quotation.service");
const { createQuotationValidationSchema } = require("../../utils/validation/admin.validation");

const createQuotation = async (request, response) => {
    try {
        // Extract data from request body
        const { quotationNo, clientName, clientCompany, validUntil, amount, items, status } = request.body;

        // Check validation
        const validationResult = await createQuotationValidationSchema.validate({
            quotationNo, clientName, clientCompany, validUntil, amount, items, status
        }, { abortEarly: true });

        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        // Check if quotation number already exists
        const isQuotationExist = await quotationService.getQuotationByNumber(quotationNo);
        if (isQuotationExist) {
            response.status(200).json({
                status: "FAILED",
                message: "Quotation number already exists, Please use different quotation number",
            });
            return;
        }

        const dataToInsert = {
            quotationNo: quotationNo?.toUpperCase(),
            clientName,
            clientCompany: clientCompany || "",
            createdDate: new Date(),
            validUntil: new Date(validUntil),
            amount: parseFloat(amount),
            items: items || [],
            status: status || "Draft",
            createdBy: request.user?.id || "admin",
            isActive: true,
        }

        // Insert data into db & send response to client
        const result = await quotationService.createQuotation(dataToInsert);
        if (result) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Quotation created successfully"
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to create quotation, Please try again!",
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

module.exports = createQuotation;
