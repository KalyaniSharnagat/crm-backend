const adminService = require("../../services/admin.service");
const { adminIdValidationSchema } = require("../../utils/validation/admin.validation");


const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.body;

        // Validate adminId
        const { error } = adminIdValidationSchema.validate({ adminId });
        if (error) {
            return res.status(400).json({
                status: "FAILED",
                message: error.details[0].message,
            });
        }

        // Delete admin
        const result = await adminService.deleteAdmin(adminId);

        if (result) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Admin deleted successfully",
                data: { adminId: result.adminId },
            });
        } else {
            return res.status(404).json({
                status: "FAILED",
                message: "Admin not found or could not be deleted",
            });
        }

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = deleteAdmin;
