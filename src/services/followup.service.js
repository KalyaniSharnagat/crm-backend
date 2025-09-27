
const FollowUp = require("../models/followup.model");

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

};

module.exports = followUpService