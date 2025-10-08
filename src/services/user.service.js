const User = require("../models/user.model");
const { Op } = require("sequelize");

const userService = {
    createUser: async (dataToInsert) => {
        return await User.create(dataToInsert);
    },

    getUserByEmail: async (email) => {
        return await User.findOne({ where: { email } });
    },

    getUserList: async ({ offset, limit, search, role, status }) => {
        const whereCondition = {};

        // 🔍 Search condition
        if (search) {
            whereCondition[Op.or] = [
                { username: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { mobile: { [Op.iLike]: `%${search}%` } },
            ];
        }

        // 🎭 Role filter
        if (role) whereCondition.role = role;

        // ⚙️ Status filter
        if (status) whereCondition.status = status === "enable";

        return await User.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order: [["createdAt", "DESC"]],
        });
    },

    updateUser: async (id, dataToUpdate) => {
        // update
        await User.update(dataToUpdate, { where: { id } });

        // fetch updated user
        const updatedUser = await User.findOne({ where: { id } });

        return updatedUser;
    },
    getUserById: async (id) => {
        return await User.findByPk(id);
    },
    deleteUser: async (id) => {
        return await User.destroy({ where: { id } });
    },

    getUserAssignList: async ({ search }) => {
        const where = {};

        if (search && search.trim() !== "") {
            where.username = { [Op.iLike]: `%${search}%` };
        }

        const users = await User.findAll({
            where,
            attributes: ["id", "username", "mobile"],
            order: [["username", "ASC"]],
        });

        return users;
    },
};

module.exports = userService;
