const Lead = require('../models/lead.model');
const { Op } = require('sequelize');

const leadService = {

    createLead: async (data) => {
        // Foreign key check: assignedTo agar hai to Admin me exist karna chahiye
        if (data.assignedTo) {
            const admin = await require("../models/admin.model").findByPk(data.assignedTo);
            if (!admin) {
                throw new Error("Assigned user not found in Admin table");
            }
        }
        const lead = await Lead.create(data);
        return lead;
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
        const pageNumber = Math.max(1, parseInt(page));
        const offset = (pageNumber - 1) * limit;

        const where = {};
        if (searchString && searchString.trim() !== "") {
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
            limit: parseInt(limit),
            offset,
            order: [["createdAt", "DESC"]],
        });
    },



    getLeadById: async (leadId) => {
        return await Lead.findOne({
            where: { id: leadId }
        });
    },

    getLeadsWithStats: async ({ page = 1, limit = 10, search = "", statusFilter = "" }) => {
        const offset = (page - 1) * limit;

        // 🔹 Base search filter
        const whereCondition = {
            [Op.and]: [
                {
                    [Op.or]: [
                        { projectName: { [Op.iLike]: `%${search}%` } },
                        { name: { [Op.iLike]: `%${search}%` } },
                        { company: { [Op.iLike]: `%${search}%` } },
                        { status: { [Op.iLike]: `%${search}%` } },
                    ],
                },
            ],
        };

        // 🔹 Add status filter when user clicks "Approved / Rejected / Pending"
        if (statusFilter) {
            whereCondition[Op.and].push({
                status: { [Op.iLike]: statusFilter }, // case-insensitive match
            });
        }

        // 🔹 Counts (case-insensitive)
        const [approved, rejected, pending, totalLeads] = await Promise.all([
            Lead.count({ where: { status: { [Op.iLike]: "approved" } } }),
            Lead.count({ where: { status: { [Op.iLike]: "rejected" } } }),
            Lead.count({ where: { status: { [Op.iLike]: "pending" } } }),
            Lead.count({ where: whereCondition }),
        ]);

        // 🔹 Lead list with pagination
        const leads = await Lead.findAll({
            where: whereCondition,
            attributes: [
                "id",
                "projectName",
                "date",
                "startDate",
                "endDate",
                "status",
            ],
            order: [["createdAt", "DESC"]],
            offset,
            limit,
        });

        return {
            totalLeads,
            approved,
            rejected,
            pending,
            page,
            limit,
            leads,
        };
    },

    getTotalLeadsCount: async () => {
        try {
            const total = await Lead.count();
            return total;
        } catch (error) {
            console.error("Error in getTotalLeadsCount service:", error);
            throw error;
        }
    },
};

module.exports = leadService
