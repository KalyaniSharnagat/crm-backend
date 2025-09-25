
const Admin = require("../models/admin.model");

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
    
    // ================= Admin delete=================
    getAdminById: async (id) => {
        return await Admin.findByPk(id);
    },

    deleteAdmin: async (adminId) => {
        const deletedCount = await Admin.destroy({ where: { id: adminId } });
        return deletedCount > 0 ? { adminId } : null;
    },

    //============== getall admin details===============

    getAllAdmins: async () => {
        return await Admin.findAll({
            attributes: ["id", "username", "email", "mobile"], // only needed fields
            order: [["id", "ASC"]],
        });
    }
};

module.exports = adminService