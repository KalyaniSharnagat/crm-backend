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
        if (assignedTo) where.assignedTo = assignedTo;
        if (leadId) where.leadId = leadId;

        // Search filter
        const leadWhere = {};
        if (search) {
            const { Op } = require("sequelize");
            leadWhere[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { mobile: { [Op.iLike]: `%${search}%` } },
            ];
        }

        const { rows, count } = await Assign.findAndCountAll({
            where,
            include: [
                {
                    model: require("../models/lead.model"),
                    as: "lead",
                    where: Object.keys(leadWhere).length ? leadWhere : undefined,
                    required: search ? true : false,
                }
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
