const bcrypt = require("bcrypt");
const adminService = require("../../services/admin.service");
const generateAdminJWT = require("../../utils/middleware/generate-admin-token");
const { adminLoginValidationSchema } = require("../../utils/validation/admin.validation");


const login = async (request, response) => {
    try {
        // 1. Extract data from request body
        const { email, password } = request.body;

        // 2. Validation
        const { error } = adminLoginValidationSchema.validate({ email, password }, { abortEarly: true });
        if (error) {
            return response.status(200).json({
                status: "FAILED",
                message: error?.details[0]?.message,
            });
        }

        // 3. Check if user exists
        const isUserExist = await adminService.getAdminByEmail(email);
        if (!isUserExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Invalid email, check your email & try again!",
            });
        }

        // 4. Compare password
        const matchPassword = await bcrypt.compare(password, isUserExist.password);
        if (!matchPassword) {
            return response.status(200).json({
                status: "FAILED",
                message: "Incorrect password, please check your password and try again!",
            });
        }

        // 5. Generate JWT
        const token = generateAdminJWT(isUserExist.id, isUserExist.username, isUserExist.email, isUserExist.mobile);
        if (!token) {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to generate token, please try again!",
            });
        }

        // 6. Success Response
        return response.status(200).json({
            status: "SUCCESS",
            message: "Login Successfully",
            token,
            userDetails: {
                userId: isUserExist.id,
                username: isUserExist.username,
                email: isUserExist.email,
                mobile: isUserExist.mobile,
            },
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = login;
