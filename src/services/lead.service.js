const Lead = require('../models/lead.model');
const { Op } = require('sequelize');

const leadListService = {

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

    getLeadslist: async (filters = {}, options = {}) => {
        try {
            const leads = await Lead.findAll({
                where: {
                    ...filters,
                    name: { [Op.ne]: null }, // Sequelize 'not equal null'
                },
                limit: options.limit || 20,
                offset: options.offset || 0,
                order: [["createdAt", "DESC"]],
            });
            return leads;
        } catch (error) {
            throw error;
        }
    },
    getLeadById: async (id) => {
        return await Lead.findByPk(id);
    }
}

module.exports = leadListService
