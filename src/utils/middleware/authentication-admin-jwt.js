const jwt = require("jsonwebtoken");

const authenticateAdmin = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                status: "FAILED",
                message: "Access denied. No token provided.",
            });
        }

        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.admin = decoded; // attaching admin details to request
        next();
    } catch (error) {
        return res.status(401).json({
            status: "FAILED",
            message: "Invalid or expired token",
        });
    }
};

module.exports = authenticateAdmin;
