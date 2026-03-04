const assignService = require("../../services/assign.service");

const getAssignList = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "" } = req.query;

        const { leads, count, page: currentPage, limit: pageSize } =
            await assignService.getAssignedLeadlist({ page, limit, search });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Assigned leads fetched successfully",
            pagination: {
                totalRecords: count,
                totalPages: Math.ceil(count / pageSize),
                currentPage,
                pageSize,
            },
            data: leads,
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Error fetching assigned leads",
            error: error.message,
        });
    }
};

module.exports = getAssignList;
