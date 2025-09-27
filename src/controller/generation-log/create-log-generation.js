const generationLogService = require("../../services/generationlog.service");

const createGenerationLog = async (req, res) => {
    try {
        const { leadId, action, reason } = req.body;

        if (!leadId || !action) {
            return res.status(400).json({
                status: "FAILED",
                message: "leadId and action are required",
            });
        }

        const result = await generationLogService.createLog({ leadId, action, reason });

        return res.status(200).json(result);
    } catch (error) {
        console.error("Error creating log:", error);
        return res.status(500).json({
            status: "FAILED",
            message: error.message || "Something went wrong",
        });
    }
};

module.exports = createGenerationLog;
