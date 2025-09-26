
const Assign = require("../models/assign.model");

const assignService = {

    fetchAssignList: async ({ assignedTo, leadId, page = 1, limit = 10 }) => {
        const where = {};

        // Optional filters
        if (assignedTo) where.assignedTo = assignedTo;
        if (leadId) where.leadId = leadId;

        const offset = (page - 1) * limit;

        // Fetch with count for pagination
        const { count, rows } = await Assign.findAndCountAll({
            where,
            limit,
            offset,
            order: [["createdAt", "DESC"]]
        });

        return {
            data: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        };
    }

};

module.exports = assignService