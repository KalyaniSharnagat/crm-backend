const adminService = require("../../services/admin.service");
const { adminIdValidationSchema } = require("../../utils/validation/admin.validation");

const deleteAdmin = async (req, res) => {
    try {
        const { adminId } = req.body;

        const validationResult = await adminIdValidationSchema.validate({ adminId }, { abortEarly: true });
        if (validationResult.error) {
            return res.status(400).json({
                status: "FAILED",
                message: validationResult?.error?.details[0].message,
            });
        }

        const result = await adminService.deleteAdmin(adminId);

        if (result) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Admin deleted successfully",
                data: result,
            });
        } else {
            return res.status(200).json({
                status: "FAILED",
                message: "Admin not found or could not be deleted",
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = deleteAdmin;
