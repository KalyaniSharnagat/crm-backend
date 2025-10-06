
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

        if (search) {
            whereCondition[Op.or] = [
                { name: { [Op.iLike]: `%${search}%` } },
                { email: { [Op.iLike]: `%${search}%` } },
                { mobile: { [Op.iLike]: `%${search}%` } },
            ];
        }

        if (role) whereCondition.role = role;

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
};

module.exports = userService;
