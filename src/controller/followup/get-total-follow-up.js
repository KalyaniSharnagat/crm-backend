const followUpService = require("../../services/followup.service");

const getTotalFollowUpCount = async (req, res) => {
    try {
        const totalCount = await followUpService.getTotalFollowUpCount();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Total follow-up count fetched successfully",
            data: { total: totalCount },
        });
    } catch (error) {
        console.error("Error fetching total follow-up count:", error);
        return res.status(500).json({
            status: "FAILED",
            message: "Error fetching total follow-up count",
            error: error.message,
        });
    }
};

module.exports = getTotalFollowUpCount;
