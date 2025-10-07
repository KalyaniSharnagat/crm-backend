const leadServices = require("../../services/lead.service");

const getLeadList = async (req, res) => {
    try {
        const leads = await leadServices.getAllLeads();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Lead list fetched successfully",
            data: leads,
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getLeadList;
