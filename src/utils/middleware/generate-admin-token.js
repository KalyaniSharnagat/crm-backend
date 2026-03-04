const jwt = require("jsonwebtoken");

const secretKey = process.env.JWT_SECRET_KEY;


module.exports = function generateAdminJWT(adminId, name, email, mobile) {
    return jwt.sign({ adminId, name, email, mobile }, secretKey, { expiresIn: process.env.JWT_EXPIRE_TIME });
}