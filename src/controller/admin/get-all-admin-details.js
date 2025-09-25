const adminService = require("../../services/admin.service");

const getAllAdminDetails = async (req, res) => {
    try {
        // ========== Fetch all admins ==========
        const admins = await adminService.getAllAdmins();

        if (admins && admins.length > 0) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "Admin details fetched successfully",
                data: admins.map(admin => ({
                    id: admin.id,
                    username: admin.username,
                    email: admin.email,
                    mobile: admin.mobile,
                    // isActive: admin.isActive,
                })),
            });
        } else {
            return res.status(404).json({
                status: "FAILED",
                message: "No admins found",
                data: [],
            });
        }

    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            status: "FAILED",
            message: "Internal Server Error",
            error: error.message,
        });
    }
};

module.exports = getAllAdminDetails;
