const userService = require("../../services/user.service");

const getUserAssignList = async (request, response) => {
    try {
        const search = request.body.search || request.body.search || "";

        const users = await userService.getUserAssignList({ search });

        if (!users || users.length === 0) {
            return response.status(200).json({
                message: "No users found",
                data: [],
            });
        }

        const userList = users.map(user => ({
            id: user?.id,
            username: user?.username,
            mobile: user?.mobile,
        }));

        return response.status(200).json({
            message: "User list fetched successfully",
            data: userList,
        });

    } catch (error) {
        console.error("Error fetching user list:", error);
        return response.status(500).json({
            message: error.message,
            data: [],
        });
    }
};

module.exports = getUserAssignList;
