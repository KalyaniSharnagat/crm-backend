const jwt = require('jsonwebtoken');
const adminService = require('../../services/admin.service');
// const adminService = require('../../services/admin.service');


const authenticateAdminJWT = async (request, response, next) => {
    try {
        const authHeader = request.header('authorization');
        if (authHeader) {
            const token = authHeader.split(' ')[1];

            jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, adminObject) => {
                if (err) {
                    response.status(200).json({
                        status: "JWT_INVALID",
                        message: "Your session has ended. Please login again."
                    });
                    return;
                } else {
                    request.adminId = adminObject.adminId;

                    // check if user exists
                    const doesAdminExist = await adminService.getAdminById(adminObject?.adminId)
                    if (!doesAdminExist) {
                        response.status(200).json({
                            status: "JWT_INVALID",
                            message: "Your session has ended. Please login again."
                        });
                        return;
                    }
                    request.mobile = doesAdminExist.mobile;
                    request.id = doesAdminExist.id;

                }
                next();
            });
        } else {
            response.status(200).json({
                status: "JWT_INVALID",
                message: "Your session has ended. Please login again."
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message
        });
        return;
    }
};


module.exports = authenticateAdminJWT;