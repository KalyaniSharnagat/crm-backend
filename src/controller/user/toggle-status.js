const userService = require("../../services/user.service");

const toggleUserStatus = async (request, response) => {
    try {
        const { id } = request.body;

        if (!id) {
            return response.status(200).json({
                status: "FAILED",
                message: "User ID is required",
            });
        }

        const user = await userService.getUserById(id);
        if (!user) {
            return response.status(200).json({
                status: "FAILED",
                message: "User not found with this ID",
            });
        }

        const newStatus = !user.status;
        await userService.updateUser(id, { status: newStatus });

        return response.status(200).json({
            status: "SUCCESS",
            message: `User has been ${newStatus ? "enabled" : "disabled"} successfully`,
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
                mobile: user.mobile,
                status: newStatus ? "enable" : "disable",
            },
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = toggleUserStatus;
