const jwt = require('jsonwebtoken');
const adminService = require('../../services/admin.service');

const authenticateAdminJWT = async (req, res, next) => {
    try {
        const authHeader = req.header('authorization');
        if (!authHeader) {
            return res.status(200).json({
                status: "JWT_INVALID",
                message: "Your session has ended. Please login again."
            });
        }

        const token = authHeader.split(' ')[1];

        // Verify token synchronously
        let adminObject;
        try {
            adminObject = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            return res.status(200).json({
                status: "JWT_INVALID",
                message: "Your session has ended. Please login again."
            });
        }

        // Check if admin exists
        const doesAdminExist = await adminService.getAdminById(adminObject.adminId);
        if (!doesAdminExist) {
            return res.status(200).json({
                status: "JWT_INVALID",
                message: "Your session has ended. Please login again."
            });
        }

        // Attach admin info to request
        req.adminId = adminObject.adminId;
        req.id = doesAdminExist.id;
        req.mobile = doesAdminExist.mobile;

        next(); // allow request to proceed

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = authenticateAdminJWT;
