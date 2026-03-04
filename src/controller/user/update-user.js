const userService = require("../../services/user.service");
const { updateUserValidationSchema } = require("../../utils/validation/admin.validation");

const updateUser = async (request, response) => {
    try {
        const { id, username, email, mobile, role, status } = request.body;

        const validationResult = await updateUserValidationSchema.validate(
            { id, username, email, mobile: mobile?.toString(), role, status },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
        }

        const user = await userService.getUserById(id);
        if (!user) {
            return response.status(200).json({
                status: "FAILED",
                message: "User not found with this ID",
            });
        }

        if (email && email !== user.email) {
            const isUserExist = await userService.getUserByEmail(email);
            if (isUserExist) {
                return response.status(200).json({
                    status: "FAILED",
                    message: "User already exists with this Email, please try another.",
                });
            }
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

        const statusBool = status === "enable";
        const dataToUpdate = {
            username: username ? username.toLowerCase() : user.username,
            email: email || user.email,
            mobile: mobile?.toString() || user.mobile,
            role: role || user.role,
            status: status ? statusBool : user.status,
        };


        await userService.updateUser(id, dataToUpdate);

        const updatedUser = await userService.getUserById(id);

        return response.status(200).json({
            status: "SUCCESS",
            message: "User updated successfully",
            data: {
                id: updatedUser.id,
                username: updatedUser.username,
                email: updatedUser.email,
                mobile: updatedUser.mobile,
                role: updatedUser.role,
                status: updatedUser.status ? "enable" : "disable",
                createdAt: updatedUser.createdAt,
                updatedAt: updatedUser.updatedAt,
            },
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = updateUser;
