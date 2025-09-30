const Assign = require("../models/assign.model");
const Lead = require("../models/lead.model");
const { Op } = require("sequelize");

const assignService = {

    createAssign: async (dataToInsert) => {
        // Create assign
        const assign = await Lead.create(dataToInsert);
        return assign;
    },

    getAssignList: async ({ assignedTo, leadId, search, page = 1, limit = 10 }) => {
        const offset = (page - 1) * limit;

        // Filters
        const where = {};
        if (assignedTo) where.assignTo = assignedTo;
        if (leadId) where.leadId = leadId;

        // Search filter
        const leadWhere = {};
        if (search) {
            leadWhere[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { mobile: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { rows, count } = await Assign.findAndCountAll({
            where,
            include: [
                { model: Lead, as: "lead", where: leadWhere, required: true } // join with lead
            ],
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });

        return {
            data: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit),
            },
        };
    },


    getAssignById: async (id) => {
        return await Assign.findByPk(id);
    },

    updateAssign: async (id, data) => {
        const [updated] = await Assign.update(data, { where: { id } });
        return updated > 0;
    },

    deleteAssign: async (id) => {
        const deleted = await Assign.destroy({ where: { id } });
        return deleted > 0;
    }
}

module.exports = assignService;
