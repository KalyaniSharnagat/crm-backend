const jwt = require('jsonwebtoken');
const adminService = require('../../services/admin.service');


const authenticateAdminJWT = async (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"] || req.headers["Authorization"];

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "JWT_INVALID",
                message: "Token missing. Please login again."
            });
        }

        const token = authHeader.split(" ")[1];
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        } catch (err) {
            const msg = err.name === "TokenExpiredError"
                ? "Session expired. Please login again."
                : "Invalid token. Please login again.";

            return res.status(401).json({
                status: "JWT_INVALID",
                message: msg
            });
        }

        // Fetch admin from DB to confirm still exists
        const admin = await adminService.getAdminById(decoded.adminId);

        if (!admin) {
            console.log("JWT valid but admin missing:", decoded);
            return res.status(401).json({
                status: "JWT_INVALID",
                message: "Admin does not exist. Please login again."
            });
        }

        // Attach admin info to request
        req.admin = admin;
        req.adminId = admin.id;

        next(); // proceed
    } catch (error) {
        console.error("JWT middleware error:", error);
        return res.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};


module.exports = authenticateAdminJWT;
