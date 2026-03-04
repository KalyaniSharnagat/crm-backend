const GenerationLog = require('../models/loggeneration');
const { Op } = require('sequelize');

const generationLogService = {

    createLog: async ({ leadId, action, reason }) => {
        // Check if already approved log exists
        if (action === "APPROVED") {
            const existingLog = await GenerationLog.findOne({
                where: { leadId, action: "APPROVED" },
            });

            if (existingLog) {
                return { status: "FAILED", message: "Lead already approved log exists" };
            }
        }

        // Create new log
        const log = await GenerationLog.create({
            leadId,
            action,
            message:
                action === "APPROVED"
                    ? "Congrats the lead assigned by admin"
                    : "Lead rejected by admin",
            reason: action === "REJECTED" ? reason : null,
        });

        return {
            status: "SUCCESS",
            message: "Log created successfully",
            data: log,
        };
    }

}
module.exports = generationLogService