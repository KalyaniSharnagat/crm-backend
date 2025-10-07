const Lead = require("../../models/lead.model");
const Admin = require("../../models/admin.model");

const assignLead = async (req, res) => {
    try {
        const { leadId, assignTo, assignByUser } = req.body;

        // Lead check
        const lead = await Lead.findByPk(leadId);
        if (!lead) {
            return res.status(404).json({
                status: "FAILED",
                message: "Lead not found"
            });
        }

        // AssignTo user check
        const userToAssign = await Admin.findByPk(assignTo);
        if (!userToAssign) {
            return res.status(404).json({
                status: "FAILED",
                message: "Assigned user not found"
            });
        }

        // AssignBy user check
        const userAssignBy = await Admin.findByPk(assignByUser);
        if (!userAssignBy) {
            return res.status(404).json({
                status: "FAILED",
                message: "Assign by user not found"
            });
        }

        // Update Lead
        lead.assignedTo = assignTo;
        lead.assignByUser = assignByUser;
        lead.isAssigned = true;
        await lead.save();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Lead assigned successfully",
            // data: lead
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Error assigning lead",
            error: error.message
        });
    }
};

module.exports = assignLead;
