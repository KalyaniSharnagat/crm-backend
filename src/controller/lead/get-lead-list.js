const leadServices = require("../../services/lead.service");

const getLeads = async (request, response) => {
    try {
        // Optional query parameters for filtering or pagination
        const { status, assignedTo, page = 1, limit = 20 } = request.query;

        const filters = {};
        if (status) filters.status = status;
        if (assignedTo) filters.assignedTo = assignedTo;

        const offset = (page - 1) * limit;

        const result = await leadServices.getLeadslist(filters, { limit: parseInt(limit), offset: parseInt(offset) });

        return response.status(200).json({
            status: "SUCCESS",
            message: "Leads fetched successfully",
            data: result,
        });
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getLeads;
