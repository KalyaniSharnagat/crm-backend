const Lead = require("../../models/lead.model");
const Admin = require("../../models/admin.model");
const { updateLeadAssignValidationSchema } = require("../../utils/validation/admin.validation");

const updateLeadAssign = async (req, res) => {
    try {
        const { leadId, assignTo, assignByUser } = req.body;

        // ✅ Validate request body
        const { error } = updateLeadAssignValidationSchema.validate(req.body);
        if (error) {
            return res.status(400).json({
                status: "FAILED",
                message: error.details[0].message
            });
        }

        // ✅ Lead check
        const lead = await Lead.findByPk(leadId);
        if (!lead) {
            return res.status(404).json({
                status: "FAILED",
                message: "Lead not found"
            });
        }

        // ✅ AssignTo user check
        if (assignTo) {
            const userToAssign = await Admin.findByPk(assignTo);
            if (!userToAssign) {
                return res.status(404).json({
                    status: "FAILED",
                    message: "Assigned user not found"
                });
            }
            lead.assignedTo = assignTo;
        }

        // ✅ AssignBy user check
        if (assignByUser) {
            const userAssignBy = await Admin.findByPk(assignByUser);
            if (!userAssignBy) {
                return res.status(404).json({
                    status: "FAILED",
                    message: "Assign by user not found"
                });
            }
            lead.assignByUser = assignByUser;
        }

        // ✅ Mark lead as assigned
        if (assignTo) {
            lead.isAssigned = true;
        }

        await lead.save();

        return res.status(200).json({
            status: "SUCCESS",
            message: "Lead assignment updated successfully",
            data: lead
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: "Error updating lead assignment",
            error: error.message
        });
    }
};

module.exports = updateLeadAssign;
