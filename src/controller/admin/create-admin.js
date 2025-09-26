
const bcrypt = require("bcrypt");
const adminService = require("../../services/admin.service");
const { createAdminValidationSchema } = require("../../utils/validation/admin.validation");


const createAdmin = async (request, response) => {
    try {
        //extract data from request body
        const { username, email, mobile, password } = request.body;

        //check validation
        const validationResult = await createAdminValidationSchema.validate({ username, email, mobile: mobile?.toString(), password }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        };

        //check user already exist with email
        const isUserExist = await adminService.getAdminByEmail(email);
        if (isUserExist) {
            response.status(200).json({
                status: "FAILED",
                message: "User already exist with this Email, Please try with another Email",
            });
            return;
        };

        //hash password
        const hashPassword = await bcrypt.hash(password, 12);

        const dataToInsert = {
            username: username?.toLowerCase(),
            email,
            mobile: mobile?.toString(),
            password: hashPassword,
            isActive: true,
        }

        //insert data into db & send response to client
        const result = await adminService.createAdmin(dataToInsert);
        if (result) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Admin created successfully",
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to create user, Please try again!",
            });
            return;
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        })
    }
};


module.exports = createAdmin