const followUpService = require("../../services/followup.service");
const leadService = require("../../services/lead.service");

const getClientWiseFollowUpList = async (req, res) => {
    try {
        const { leadId } = req.body;

        if (!leadId) {
            return res.status(400).json({
                status: "FAILED",
                message: "leadId is required",
            });
        }

        // Optional: If leadId is numeric, validate type
        if (isNaN(leadId)) {
            return res.status(400).json({
                status: "FAILED",
                message: "Invalid leadId format. Must be a number.",
            });
        }

        // 2. Fetch lead details
        const lead = await leadService.getLeadById(leadId);
        if (!lead) {
            return res.status(404).json({
                status: "FAILED",
                message: "Lead not found with this ID",
            });
        }

        // 3. Fetch follow-ups related to this lead/client
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

        // 4. Calculate statistics
        const totalFollowUps = followUps.length;
        const approved = followUps.filter(f => f.status?.toLowerCase() === "approved").length;
        const rejected = followUps.filter(f => f.status?.toLowerCase() === "rejected").length;
        const pending = followUps.filter(f => f.status?.toLowerCase() === "pending").length;

        // 5. Success response
        return res.status(200).json({
            status: "SUCCESS",
            message: "Client-wise follow-up list fetched successfully",
            data: {
                leadId: lead.id,
                clientName: lead.name,
                projectName: lead.project_name, // assuming snake_case from PostgreSQL
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
            message: error.message || "Internal Server Error",
        });
    }
};

module.exports = getClientWiseFollowUpList;
