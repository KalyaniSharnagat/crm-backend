// controllers/assignList.controller.js
const assignService = require("../../services/assign.service");

const getAssignList = async (req, res) => {
    try {
        const { assignedTo, leadId, page = 1, limit = 10, search } = req.query;

        const list = await assignService.getAssignList({
            assignedTo,
            leadId,
            search,
            page: parseInt(page),
            limit: parseInt(limit),
        });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Assigned list fetched successfully",
            data: list.data,
            pagination: list.pagination,
        });
    } catch (error) {
        return res.status(500).json({ status: "FAILED", message: error.message });
    }
};

module.exports = getAssignList;
