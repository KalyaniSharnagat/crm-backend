const jwt = require("jsonwebtoken");

const generateAdminJWT = (id, username, email, mobile) => {
    try {
        const token = jwt.sign(
            { id, username, email, mobile },
            process.env.JWT_SECRET,
            { expiresIn: "1d" } // token valid for 1 day
        );
        return token;
    } catch (error) {
        console.error("Error generating admin token:", error);
        return null;
    }
};

module.exports = generateAdminJWT;
