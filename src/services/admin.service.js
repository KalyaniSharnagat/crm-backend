
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
    getAdminById : async (id) => {
    try {
        const admin = await Admin.findByPk(id);
        return admin;
    } catch (error) {
        console.error("Error in getAdminById:", error);
        throw error;
    }
}

};

module.exports = adminService