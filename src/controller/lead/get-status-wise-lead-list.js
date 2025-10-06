const leadService = require("../../services/lead.service");

const getTotalLeadsCount = async (req, res) => {
    try {
        const { page, limit, search, status } = req.query;

        const data = await leadService.getLeadsWithStats({
            page: Number(page) || 1,
            limit: Number(limit) || 10,
            search: search || "",
            statusFilter: status || "", // filter Approved / Rejected / Pending
        });

        return res.status(200).json({
            status: "SUCCESS",
            message: "Leads fetched successfully",
            data,
        });
    } catch (error) {
        console.error("Error fetching leads:", error);
        return res.status(500).json({
            status: "FAILED",
            message: "Error fetching leads",
            error: error.message,
        });
    }
};

module.exports = getTotalLeadsCount;
