const leadService = require("../../services/lead.service");

const getTotalLeadsCount = async (req, res) => {
    try {
        const totalCount = await leadService.getTotalLeadsCount();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Total leads count fetched successfully",
            data: { total: totalCount },
        });
    } catch (error) {
        console.error("Error fetching total leads count:", error);
        return res.status(500).json({
            status: "FAILED",
            message: "Error fetching total leads count",
            error: error.message,
        });
    }
};

module.exports = getTotalLeadsCount;
