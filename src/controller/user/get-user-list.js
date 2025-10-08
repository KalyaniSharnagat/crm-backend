// controllers/user/get-user-list.js
const userService = require("../../services/user.service");

const getUserList = async (req, res) => {
    try {
        const { page = 1, limit = 10, search = "", role, status } = req.body;
        const offset = (page - 1) * limit;

        const { rows: users, count: totalRecords } = await userService.getUserList({
            offset,
            limit,
            search,
            role,
            status,
        });

        const totalPages = Math.ceil(totalRecords / limit);

        const formattedUsers = users.map((user) => ({
            id: user.id,
            username: user.username,
            email: user.email,
            mobile: user.mobile,
            role: user.role,
            status: user.status ? "enable" : "disable",
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        }));

        return res.status(200).json({
            status: "SUCCESS",
            message: "User list fetched successfully",
            data: {
                users: formattedUsers,
                pagination: {
                    totalRecords,
                    totalPages,
                    currentPage: page,
                },
            },
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = getUserList;
