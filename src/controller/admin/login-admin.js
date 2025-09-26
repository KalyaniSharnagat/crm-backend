
const bcrypt = require("bcrypt");
const { loginValidationSchema } = require("../../utils/validation/admin.validation");
const generateAdminJWT = require("../../utils/middleware/generate-admin-token");
const adminService = require("../../services/admin.service");
const login = async (request, response) => {
    try {
        //extract data from request body
        const { email, password } = request.body;

        //check validation
        const validationResult = await loginValidationSchema.validate({ email, password }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        };

        //check user exist or not
        const isUserExist = await adminService.getAdminByEmail(email);
        if (!isUserExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Invalid email, check your email & try again!"
            })
        };

        const matchPassword = await bcrypt.compare(password, isUserExist.password);
        if (!matchPassword) {
            return response.status(200).json({
                status: "FAILED",
                message: "Incorrect password, please check your password and try again!"
            })
        }

        //Check password same or not
        const token = generateAdminJWT(isUserExist.id, isUserExist.name, isUserExist?.email, isUserExist?.mobile)
        if (token) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Login Successfully",
                token,
                userDetails: {
                    userId: isUserExist.id,
                    username: isUserExist.username,
                    email: isUserExist.email,
                    mobile: isUserExist.mobile,
                }
            })
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to Login, please again!",
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
        return;
    }
};


module.exports = login;