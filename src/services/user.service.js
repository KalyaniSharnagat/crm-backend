
const Admin = require("../models/admin.model");
const { Op } = require("sequelize");

const userService = {
    createUser: async (dataToInsert) => {
        return await Admin.create(dataToInsert);
    },

    getUserByEmail: async (email) => {
        return await Admin.findOne({ where: { email } });
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

        return await Admin.findAndCountAll({
            where: whereCondition,
            offset,
            limit,
            order: [["createdAt", "DESC"]],
        });
    },
    updateUser: async (id, dataToUpdate) => {
        return await Admin.update(dataToUpdate, { where: { id } });
    },
    getUserById: async (id) => {
        return await Admin.findByPk(id);
    },
    deleteUser: async (id) => {
        return await Admin.destroy({ where: { id } });
    },
};

module.exports = userService;
