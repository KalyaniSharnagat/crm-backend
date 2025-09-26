const quotationService = require("../../services/quotation.service");

const getQuotationList = async (request, response) => {
    try {
        // extract data from request body
        const { page, searchString } = request.body;

        const result = await quotationService.getQuotationList(page, searchString);

        if (result?.totalPages) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Quotation list fetched successfully",
                ...result
            });
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "FAILED to fetch Quotation list, please try again",
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
        return;
    }
};

module.exports = getQuotationList;
