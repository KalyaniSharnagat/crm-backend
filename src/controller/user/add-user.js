const userService = require("../../services/user.service");
const { createUserValidationSchema } = require("../../utils/validation/admin.validation");

const createUser = async (request, response) => {
    try {
        const { username, email, password, mobile, role, status } = request.body;

        const validationResult = await createUserValidationSchema.validate({ username, email, password, mobile: mobile?.toString(), role, status }, { abortEarly: true });
        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        };

        const isUserExist = await userService.getUserByEmail(email);
        if (isUserExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "User already exists with this Email, please try another.",
            });
        }
        const statusBool = (status === "enable");
        const dataToInsert = {
            username: username?.toLowerCase(),
            email,
            password,
            mobile: mobile?.toString() || null,
            role: role || "Directer",
            status: statusBool,
        };

        const result = await userService.createUser(dataToInsert);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "User created successfully",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to create user, please try again!",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = createUser;
