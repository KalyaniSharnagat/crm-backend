const Work = require("../models/work.model");
const Lead = require("../models/lead.model");
const Quotation = require("../models/quotation.model");

const workService = {

    // ================= Create Work =================
    createWork: async (data) => {
        try {
            return await Work.create(data);
        } catch (error) {
            console.error("Error in createWork:", error);
            throw error;
        }
    },


    // ================= Get Work by ID =================
    getWorkByWorkId: async (id) => {
        try {
            return await Work.findByPk(id, {
                include: [
                    { model: Lead, as: "lead" },
                    { model: Quotation, as: "quotation" }
                ]
            });
        } catch (error) {
            console.error("Error in getWorkById:", error);
            throw error;
        }
    },

    // ================= Get Work by Lead + Quotation (duplicate check) =================
    getWorkByLeadAndQuotation: async (leadName, quotationNo) => {
        return await Work.findOne({
            where: { leadName, quotationNo }
        });
    },



    // ================= Update Work =================
    updateWork: async (id, data) => {
        try {
            await Work.update(data, { where: { id } });
            return await Work.findByPk(id, {
                include: [
                    { model: Lead, as: "lead" },
                    { model: Quotation, as: "quotation" }
                ]
            });
        } catch (error) {
            console.error("Error in updateWork:", error);
            throw error;
        }
    },


    // ================= Delete Work =================
    // deleteWork: async (id) => {
    //     try {
    //         const deletedCount = await Work.destroy({ where: { id } });
    //         return deletedCount > 0 ? { id } : null;
    //     } catch (error) {
    //         console.error("Error in deleteWork:", error);
    //         throw error;
    //     }
    // },

    // // ================= Get All Works =================
    // getAllWorks: async () => {
    //     try {
    //         return await Work.findAll({
    //             include: [
    //                 { model: Lead, as: "lead" },
    //                 { model: Quotation, as: "quotation" }
    //             ],
    //             order: [["id", "ASC"]]
    //         });
    //     } catch (error) {
    //         console.error("Error in getAllWorks:", error);
    //         throw error;
    //     }
    // }
};

module.exports = workService;
