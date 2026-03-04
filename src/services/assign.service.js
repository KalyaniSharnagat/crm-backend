const Admin = require("../models/admin.model");
const Assign = require("../models/assign.model");
const Lead = require("../models/lead.model");
const { Op } = require("sequelize");

const assignService = {

    createAssign: async (dataToInsert) => {
        // Create assign
        const assign = await Lead.create(dataToInsert);
        return assign;
    },

    getAssignedLeadlist: async ({ page = 1, limit = 10, search = "" }) => {
        page = parseInt(page);
        limit = parseInt(limit);
        const offset = (page - 1) * limit;

        const searchCondition = search
            ? {
                [Op.or]: [
                    { name: { [Op.like]: `%${search}%` } },
                    { email: { [Op.like]: `%${search}%` } },
                    { company: { [Op.like]: `%${search}%` } },
                    { "$assignBy.username$": { [Op.like]: `%${search}%` } },
                    { "$assignedUser.username$": { [Op.like]: `%${search}%` } },
                ],
            }
            : {};

        const { rows, count } = await Lead.findAndCountAll({
            where: { isAssigned: true, ...searchCondition },
            include: [
                { model: Admin, as: "assignBy", attributes: ["id", "username", "email"] },
                { model: Admin, as: "assignedUser", attributes: ["id", "username", "email"] }
            ],
            offset,
            limit,
            distinct: true,
            order: [["createdAt", "DESC"]],
        });

        return { leads: rows, count, page, limit };
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
