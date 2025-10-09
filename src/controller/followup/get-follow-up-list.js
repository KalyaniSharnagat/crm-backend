const followUpService = require("../../services/followup.service");

const getFollowUpList = async (request, response) => {
    try {
        const { page = 1, searchString = "" } = request.body;


        const result = await followUpService.getAllFollowUpList(page, searchString);

        if (result?.totalPages > 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Follow-ups fetched successfully",
                ...result,
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "No follow-ups found",
            });
        }
    } catch (error) {
        console.error("❌ Error fetching follow-up list:", error);
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getFollowUpList;
