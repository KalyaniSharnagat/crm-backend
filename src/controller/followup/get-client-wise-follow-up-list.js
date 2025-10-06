const followUpService = require("../../services/followup.service");
const leadService = require("../../services/lead.service");

const getClientWiseFollowUpList = async (request, response) => {
    try {
        const { leadId, status, fromDate, toDate } = request.body;

        let allFollowUps = await followUpService.getAllFollowUps();

        const totalFollowUps = allFollowUps.length;
        const totalApproved = allFollowUps.filter(f => f.status?.toLowerCase() === "approved").length;
        const totalRejected = allFollowUps.filter(f => f.status?.toLowerCase() === "rejected").length;
        const totalPending = allFollowUps.filter(f => f.status?.toLowerCase() === "pending").length;

        let followUps = allFollowUps;
        let clientName = "All Clients";
        let projectName = "";

        if (leadId) {
            const lead = await leadService.getLeadById(leadId);
            if (!lead) {
                return response.status(404).json({
                    status: "FAILED",
                    message: "Lead not found with this ID",
                });
            }
            clientName = lead.name;
            projectName = lead.project_name;
            followUps = followUps.filter(f => f.leadId == leadId);
        }

        if (status) {
            followUps = followUps.filter(f => f.status?.toLowerCase() === status.toLowerCase());
        }

        if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            followUps = followUps.filter(f => {
                const date = new Date(f.followUpDate || f.createdAt);
                return date >= from && date <= to;
            });
        }

        return response.status(200).json({
            status: "SUCCESS",
            message: "Client-wise follow-up list fetched successfully",
            data: {
                leadId: leadId || null,
                clientName,
                projectName,
                totalFollowUps,
                approved: totalApproved,
                rejected: totalRejected,
                pending: totalPending,
                filteredCount: followUps.length,   // only 2 match this leadId
                followUpList: followUps,
            },
        });

    } catch (error) {
        console.error("Error fetching follow-up list:", error);
        return response.status(500).json({
            status: "FAILED",
            message: error.message || "Internal Server Error",
        });
    }
};

module.exports = getClientWiseFollowUpList;
