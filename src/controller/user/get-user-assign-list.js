const userService = require("../../services/user.service");

const getUserAssignList = async (request, response) => {
    try {
        const search = request.query.search || request.body.search || "";

        const users = await userService.getUserAssignList({ search });

        if (!users || users.length === 0) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "No users found",
                data: [],
            });
        }

        // 🧠 Include username + mobile number
        const userNames = users.map(user => `${user.username} - ${user.mobile}`);

        return response.status(200).json({
            status: "SUCCESS",
            message: "User list fetched successfully",
            data: userNames,
        });

    } catch (error) {
        console.error("Error fetching user list:", error);
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getUserAssignList;
