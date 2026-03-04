const quotationService = require("../../services/quotation.service");

const getAllQuotations = async (request, response) => {
    try {
        const result = await quotationService.getAllQuotations();
        if (result && result.length > 0) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Quotations fetched successfully",
                data: result
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "No quotations found",
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

module.exports = getAllQuotations;
