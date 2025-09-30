const adminService = require("../../services/admin.service");
const assignService = require("../../services/assign.service");
const leadListService = require("../../services/lead.service");

const updateAssign = async (reqest, response) => {
    try {
        const { id: assignByUser } = reqest; // logged-in admin
        const { assignId } = reqest.params;  // assign id from URL
        const { leadId, assignTo } = reqest.body;

        // ===== Check assign exist =====
        const existingAssign = await assignService.getAssignById(assignId);
        if (!existingAssign) {
            return response.status(404).json({
                status: "FAILED",
                message: "Assignment not found"
            });
        }

        // ===== Check lead exist =====
        if (leadId) {
            const lead = await leadListService.getLeadById(leadId);
            if (!lead) {
                return response.status(404).json({
                    status: "FAILED",
                    message: "Lead does not exist"
                });
            }
        }

        // ===== Check admin exist =====
        if (assignTo) {
            const admin = await adminService.getAdminById(assignTo);
            if (!admin) {
                return response.status(404).json({
                    status: "FAILED",
                    message: "Selected assign-to user does not exist"
                });
            }
        }

        // ===== Update record =====
        const dataToUpdate = {
            leadId: leadId ?? existingAssign.leadId,
            assignTo: assignTo ?? existingAssign.assignTo,
            assignByUser
        };

        const updated = await assignService.updateAssign(assignId, dataToUpdate);

        if (updated) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Assignment updated successfully"
            });
        }

        return response.status(200).json({
            status: "FAILED",
            message: "Failed to update assignment"
        });
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = updateAssign;
