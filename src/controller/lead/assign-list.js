const assignService = require("../../services/assign.service");

const getAssignList = async (req, res) => {
    try {
        // Safe destructuring
        const query = req.query || {};
        const { assignedTo, leadId, page = 1, limit = 10 } = query;

        // Call service
        const list = await assignService.fetchAssignList({
            assignedTo,
            leadId,
            page: parseInt(page),
            limit: parseInt(limit)
        });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Assigned list fetched successfully",
            data: list.data,
            pagination: list.pagination
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message || "Something went wrong"
        });
    }
};

module.exports = getAssignList;
