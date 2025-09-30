const Lead = require('../models/lead.model');
const { Op } = require('sequelize');

const leadService = {

    createLead: async (data) => {
        return await Lead.create(data);
    },

    // Find lead by email
    getLeadByEmail: async (email) => {
        return await Lead.findOne({ where: { email } });
    },

    updateLead: async (id, dataToUpdate) => {
        try {
            // Update lead by ID
            const [updatedRowsCount] = await Lead.update(dataToUpdate, {
                where: { id },
            });

            if (updatedRowsCount === 0) {
                // No rows updated (invalid ID)
                return null;
            }
            // Fetch and return the updated lead
            const updatedLead = await Lead.findOne({ where: { id } });
            return updatedLead;
        } catch (error) {
            throw error;
        }
    },

    deleteLead: async (id) => {
        try {
            const deletedRowsCount = await Lead.destroy({
                where: { id },
            });

            return deletedRowsCount > 0; // returns true if a row was deleted
        } catch (error) {
            throw error;
        }
    },

    getLeadList: async (page = 1, limit = 10, searchString = "") => {
        const offset = (page - 1) * limit;

        const where = {};
        if (searchString) {
            where[Op.or] = [
                { name: { [Op.iLike]: `%${searchString}%` } },
                { email: { [Op.iLike]: `%${searchString}%` } },
                { mobile: { [Op.iLike]: `%${searchString}%` } },
                { company: { [Op.iLike]: `%${searchString}%` } },
                { projectName: { [Op.iLike]: `%${searchString}%` } },
            ];
        }

        return await Lead.findAndCountAll({
            where,
            limit,
            offset,
            order: [["createdAt", "DESC"]],
        });
    },


    getLeadById: async (leadId) => {
        return await Lead.findOne({
            where: { id: leadId }
        });
    }

};

module.exports = leadService
