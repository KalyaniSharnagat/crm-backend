const FollowUp = require("../models/followup.model");
const { Op } = require("sequelize");

const followUpService = {

    createFollowUp: async (data) => {
        return await FollowUp.create(data);
    },

    getFollowUpByLeadAndDate: async (leadId, followUpDate) => {
        return await FollowUp.findOne({ where: { leadId, followUpDate } });
    },

    updateFollowUp: async (id, data) => {
        const [rowsUpdated, [updatedFollowUp]] = await FollowUp.update(data, {
            where: { id },
            returning: true
        });
        return rowsUpdated ? updatedFollowUp : null;
    },

    getFollowUpById: async (id) => {
        return await FollowUp.findOne({ where: { id } });
    },

    approveFollowUp: async (id, approvedBy) => {
        const [rowsUpdated, [updatedFollowUp]] = await FollowUp.update(
            {
                status: "Approved",
                approvedBy,
                approvalDate: new Date()
            },
            {
                where: { id },
                returning: true
            }
        );
        return rowsUpdated ? updatedFollowUp : null;
    },

    rejectFollowUp: async (id, rejectedBy, rejectionReason) => {
        const [rowsUpdated, [updatedFollowUp]] = await FollowUp.update(
            {
                status: "Rejected",
                rejectedBy,
                rejectionReason,
                rejectionDate: new Date()
            },
            {
                where: { id },
                returning: true
            }
        );
        return rowsUpdated ? updatedFollowUp : null;
    },

    getFollowUpsByLeadId: async (leadId) => {
        return await FollowUp.findAll({
            where: { leadId },
            order: [["followUpDate", "DESC"]],
        });
    },

    getAllFollowUps: async () => {
        return await FollowUp.findAll();
    },

    getTotalFollowUpCount: async () => {
        return await FollowUp.count();
    },

    getFollowUplist: async (filter = {}, offset = 0, limit = 10) => {
        const where = {};

        if (filter.search) {
            where[Op.or] = [
                { clientName: { [Op.iLike]: `%${filter.search}%` } },
                { projectName: { [Op.iLike]: `%${filter.search}%` } },
                { followUpByName: { [Op.iLike]: `%${filter.search}%` } },
            ];
        }

        if (filter.status) {
            where.status = filter.status;
        }

        if (filter.fromDate && filter.toDate) {
            where.followUpDate = { [Op.between]: [filter.fromDate, filter.toDate] };
        } else if (filter.fromDate) {
            where.followUpDate = { [Op.gte]: filter.fromDate };
        } else if (filter.toDate) {
            where.followUpDate = { [Op.lte]: filter.toDate };
        }

        return await FollowUp.findAll({
            where,
            order: [[filter.sortBy || "followUpDate", filter.sortOrder || "DESC"]],
            offset,
            limit,
        });
    },

    countFollowUps: async (filter = {}) => {
        const where = {};

        if (filter.search) {
            where[Op.or] = [
                { clientName: { [Op.iLike]: `%${filter.search}%` } },
                { projectName: { [Op.iLike]: `%${filter.search}%` } },
                { followUpByName: { [Op.iLike]: `%${filter.search}%` } },
            ];
        }

        if (filter.status) {
            where.status = filter.status;
        }

        if (filter.fromDate && filter.toDate) {
            where.followUpDate = { [Op.between]: [filter.fromDate, filter.toDate] };
        } else if (filter.fromDate) {
            where.followUpDate = { [Op.gte]: filter.fromDate };
        } else if (filter.toDate) {
            where.followUpDate = { [Op.lte]: filter.toDate };
        }

        return await FollowUp.count({ where });
    },

};

module.exports = followUpService;
