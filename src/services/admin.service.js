const Admin = require("../models/admin.model");
const { Op } = require("sequelize");

const adminService = {
    // ================= Get Admin email =================
    getAdminByEmail: async (email) => {
        return await Admin.findOne({ where: { email } });
    },

    // ================= create Admin  =================
    createAdmin: async (data) => {
        return await Admin.create(data);
    },

    // ================= Get Admin by ID =================
    getAdminById: async (id) => {
        try {
            const admin = await Admin.findByPk(id);
            return admin;
        } catch (error) {
            console.error("Error in getAdminById:", error);
            throw error;
        }
    },
    //  getAdminUserById: async (id) => {
    //     return await Admin.findOne({ where: { id: id } });
    // },
    getAdminList: async ({ page = 1, limit = 10, searchString = "", role, isActive }) => {
        try {
            const filter = {};

            if (role) filter.role = role;
            if (isActive !== undefined) filter.isActive = isActive;

            if (searchString) {
                const searchRegex = `%${searchString}%`;
                filter[Op.or] = [
                    { username: { [Op.iLike]: searchRegex } },
                    { email: { [Op.iLike]: searchRegex } },
                    { mobile: { [Op.iLike]: searchRegex } }
                ];
            }

            page = page && page > 0 ? parseInt(page) : 1;
            const offset = (page - 1) * limit;

            const { count: totalRecords, rows: admins } = await Admin.findAndCountAll({
                where: filter,
                order: [["id", "DESC"]],
                limit,
                offset
            });

            const totalPages = Math.ceil(totalRecords / limit);

            return {
                totalRecords,
                totalPages,
                currentPage: page,
                admins
            };
        } catch (error) {
            throw error;
        }
    },

    // ================= Admin delete=================
    getAdminById: async (id) => {
        return await Admin.findByPk(id);
    },

    deleteAdmin: async (adminId) => {
        const deletedCount = await Admin.destroy({ where: { id: adminId } });
        return deletedCount > 0 ? { adminId } : null;
    },

    //============== getall admin details===============

    getAdminDetails: async () => {
        return await Admin.findAll({
            attributes: ["id", "username", "email", "mobile"], // only needed fields
            order: [["id", "ASC"]],
        });
    }
};

module.exports = adminService