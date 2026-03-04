const userService = require("../../services/user.service");
const { createUserValidationSchema } = require("../../utils/validation/admin.validation");

const createUser = async (request, response) => {
    try {
        const { username, email, mobile, role, status } = request.body;


        const validationResult = await createUserValidationSchema.validate(
            { username, email, mobile: mobile?.toString(), role, status },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message,
            });
        }

        const isUserExist = await userService.getUserByEmail(email);
        if (isUserExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "User already exists with this Email, please try another.",
            });
        }

        const allowedRoles = [
            "Admin",
            "Manager",
            "Sales Team",
            "Team Leader",
            "Director",
            "Tech Head",
            "CEO",
            "Sales Head",
            "HR"
        ];
        const userRole = role
            ? allowedRoles.find(r => r.toLowerCase() === role.trim().toLowerCase())
            : "Admin"; // default role

        if (!userRole) {
            return response.status(200).json({
                status: "FAILED",
                message: `Invalid role. Allowed roles are: ${allowedRoles.join(", ")}`
            });
        }

        const statusBool = (status === "enable");

        const dataToInsert = {
            username: username?.toLowerCase(),
            email,
            mobile: mobile?.toString() || null,
            role: userRole,
            status: statusBool,
        };
        const result = await userService.createUser(dataToInsert);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "User created successfully",
                data: result
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to create user, please try again!"
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
