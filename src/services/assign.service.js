const Assign = require("../models/assign.model");
const Lead = require("../models/lead.model");

const assignService = {

    createAssign: async (dataToInsert) => {
        // Create assign
        const assign = await Lead.create(dataToInsert);
        return assign;
    },

    getAssignList: async (filters = {}, options = {}) => {
        const assigns = await Assign.findAll({
            where: filters,
            include: [{ model: Lead, as: "lead" }],
            limit: options.limit || 20,
            offset: options.offset || 0,
            order: [["createdAt", "DESC"]],
        });
        return assigns;
    },

    getAssignById: async (id) => {
        return await Assign.findByPk(id, {
            include: [{ model: Lead, as: "lead" }]
        });
    },

    updateAssign: async (id, dataToUpdate) => {
        const [updatedCount] = await Assign.update(dataToUpdate, { where: { id } });
        if (updatedCount === 0) return null;
        return await Assign.findByPk(id);
    },

    deleteAssign: async (id) => {
        const deletedCount = await Assign.destroy({ where: { id } });
        return deletedCount > 0;
    }
}

module.exports = assignService;
