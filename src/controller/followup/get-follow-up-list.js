const followUpService = require("../../services/followup.service");

const getFollowUpList = async (request, response) => {
    try {
        const {
            search = "",
            status,
            fromDate,
            toDate,
            page = 1,
            limit = 10,
            sortBy = "followUpDate",
            sortOrder = "DESC",
        } = request.body || {};

        const pageNumber = parseInt(page, 10);
        const pageSize = parseInt(limit, 10);
        const offset = (pageNumber - 1) * pageSize;

        // Build filter object
        const filter = { search, status, fromDate, toDate, sortBy, sortOrder };

        // Fetch follow-ups and total count in parallel
        const [followUps, totalCount] = await Promise.all([
            followUpService.getFollowUplist(filter, offset, pageSize),
            followUpService.countFollowUps(filter),
        ]);

        return response.status(200).json({
            status: "SUCCESS",
            message: "Follow-ups fetched successfully",
            data: {
                page: pageNumber,
                limit: pageSize,
                totalFollowUps: totalCount,
                totalPages: Math.ceil(totalCount / pageSize),
                followUps,
            },
        });

    } catch (error) {
        console.error("Error fetching follow-ups:", error);
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getFollowUpList;
