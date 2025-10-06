const followUpService = require("../../services/followup.service");
const leadService = require("../../services/lead.service");

const getClientWiseFollowUpList = async (req, res) => {
    try {
        const { leadId } = req.params; // client/lead ID from URL

        // ✅ Validate leadId
        if (!leadId) {
            return res.status(400).json({
                status: "FAILED",
                message: "leadId is required",
            });
        }

        // ✅ Check if lead exists
        const lead = await leadService.getLeadById(leadId);
        if (!lead) {
            return res.status(404).json({
                status: "FAILED",
                message: "Lead not found with this ID",
            });
        }

        // ✅ Fetch all follow-ups for this lead
        const followUps = await followUpService.getFollowUpsByLeadId(leadId);

        if (!followUps || followUps.length === 0) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "No follow-ups found for this client",
                data: {
                    totalFollowUps: 0,
                    approved: 0,
                    rejected: 0,
                    pending: 0,
                    followUpList: [],
                },
            });
        }

        // ✅ Calculate counts
        const totalFollowUps = followUps.length;
        const approved = followUps.filter(f => f.status === "Approved").length;
        const rejected = followUps.filter(f => f.status === "Rejected").length;
        const pending = followUps.filter(f => f.status === "Pending").length;

        // ✅ Response
        return res.status(200).json({
            status: "SUCCESS",
            message: "Client-wise follow-up list fetched successfully",
            data: {
                leadId: lead.id,
                clientName: lead.name,
                projectName: lead.projectName,
                totalFollowUps,
                approved,
                rejected,
                pending,
                followUpList: followUps,
            },
        });

    } catch (error) {
        console.error("Error fetching client-wise follow-up list:", error);
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getClientWiseFollowUpList;
