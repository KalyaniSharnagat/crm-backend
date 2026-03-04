const Lead = require("../../models/lead.model");

const deleteAssignLead = async (req, res) => {
    try {
        const { leadId } = req.body;

        // Check if lead exists
        const lead = await Lead.findByPk(leadId);
        if (!lead) {
            return res.status(404).json({
                status: "FAILED",
                message: "Lead not found"
            });
        }

        // If lead is not assigned
        if (!lead.isAssigned) {
            return res.status(400).json({
                status: "FAILED",
                message: "Lead is not assigned to anyone"
            });
        }

        //  Unassign lead
        lead.assignedTo = null;
        lead.assignByUser = null;
        lead.isAssigned = false;

        await lead.save();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Assign Lead deleted successfully"
            // data: lead
        });

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Error unassigning lead",
            error: error.message
        });
    }
};

module.exports = deleteAssignLead;
