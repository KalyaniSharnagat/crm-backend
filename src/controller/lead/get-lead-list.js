const leadServices = require("../../services/lead.service");

const getLeadList = async (req, res) => {
    try {
        const { page = 1, limit = 10, searchString = "" } = req.body;

        // Fetch list from service
        const result = await leadServices.getLeadList(page, limit, searchString);

        return res.status(200).json({
            status: "SUCCESS",
            message: "Lead list fetched successfully",
            data: result.rows,
            totalRecords: result.count,
            currentPage: page,
            totalPages: Math.ceil(result.count / limit),
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getLeadList;
