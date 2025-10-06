const followUpService = require("../../services/followup.service");
const leadService = require("../../services/lead.service");

const getClientWiseFollowUpList = async (request, response) => {
    try {
        const { leadId } = request.body;

        if (!leadId) {
            return response.status(400).json({
                status: "FAILED",
                message: "leadId is required",
            });
        }

        if (isNaN(leadId)) {
            return response.status(400).json({
                status: "FAILED",
                message: "Invalid leadId format. Must be a number.",
            });
        }

        const lead = await leadService.getLeadById(leadId);
        if (!lead) {
            return response.status(404).json({
                status: "FAILED",
                message: "Lead not found with this ID",
            });
        }

        const followUps = await followUpService.getFollowUpsByLeadId(leadId);

        if (!followUps || followUps.length === 0) {
            return response.status(200).json({
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

        const totalFollowUps = followUps.length;
        const approved = followUps.filter(f => f.status?.toLowerCase() === "approved").length;
        const rejected = followUps.filter(f => f.status?.toLowerCase() === "rejected").length;
        const pending = followUps.filter(f => f.status?.toLowerCase() === "pending").length;

        return response.status(200).json({
            status: "SUCCESS",
            message: "Client-wise follow-up list fetched successfully",
            data: {
                leadId: lead.id,
                clientName: lead.name,
                projectName: lead.project_name,
                totalFollowUps,
                approved,
                rejected,
                pending,
                followUpList: followUps,
            },
        });

    } catch (error) {
        console.error("Error fetching client-wise follow-up list:", error);
        return response.status(500).json({
            status: "FAILED",
            message: error.message || "Internal Server Error",
        });
    }
};

module.exports = getClientWiseFollowUpList;
