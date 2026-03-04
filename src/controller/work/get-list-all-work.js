const workServices = require("../../services/work.service");

const getAllWorks = async (request, response) => {
    try {
        // Optional filters (status, assignedTo, date range)
        const { status, assignedTo, startDate, endDate } = request.query;
        const filters = {};

        if (status) filters.status = status;
        if (assignedTo) filters.assignedTo = assignedTo;
        if (startDate && endDate) {
            filters.startDate = { $gte: startDate };
            filters.endDate = { $lte: endDate };
        }

        const works = await workServices.getAllWorks(filters);

        return response.status(200).json({
            status: "SUCCESS",
            message: "Works fetched successfully",
            data: works
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = getAllWorks;
