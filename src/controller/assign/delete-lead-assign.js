const assignService = require("../../services/assign.service");

const deleteAssign = async (req, res) => {
    try {
        const { assignId } = req.params;

        // ===== Check assign exist =====
        const existingAssign = await assignService.getAssignById(assignId);
        if (!existingAssign) {
            return res.status(404).json({
                status: "FAILED",
                message: "Assignment not found"
            });
        }

        // ===== Delete record =====
        const deleted = await assignService.deleteAssign(assignId);

        if (deleted) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Assignment deleted successfully"
            });
        }

        return res.status(200).json({
            status: "FAILED",
            message: "Failed to delete assignment"
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = deleteAssign;
