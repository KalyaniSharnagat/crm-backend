const userService = require("../../services/user.service");

const getUserById = async (request, response) => {
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

        return response.status(200).json({
            status: "SUCCESS",
            message: "User fetched successfully",
            data: {
                id: user.id,
                username: user.username,
                email: user.email,
                mobile: user.mobile,
                role: user.role,
                status: user.status ? "enable" : "disable",
                createdAt: user.createdAt,
                updatedAt: user.updatedAt,
            },
        });

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getUserById;
