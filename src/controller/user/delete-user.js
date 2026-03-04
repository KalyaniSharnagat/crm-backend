const userService = require("../../services/user.service");

const deleteUser = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(200).json({
                status: "FAILED",
                message: "User ID is required for deletion",
            });
        }

        const user = await userService.getUserById(id);
        if (!user) {
            return res.status(200).json({
                status: "FAILED",
                message: "User not found with this ID",
            });
        }

        await userService.deleteUser(id);

        return res.status(200).json({
            status: "SUCCESS",
            message: "User deleted successfully",
        });

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = deleteUser;
