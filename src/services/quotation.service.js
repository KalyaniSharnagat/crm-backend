const Quotation = require("../models/quotation.model");
const { Op } = require("sequelize");

const quotationService = {
    getQuotationByNumber: async (quotationNo) => {
        return await Quotation.findOne({ where: { quotationNo: quotationNo?.toUpperCase() } });
    },

    createQuotation: async (data) => {
        return await Quotation.create(data);
    },

    getQuotationById: async (id) => {
        try {
            const quotation = await Quotation.findByPk(id);
            return quotation;
        } catch (error) {
            console.error("Error in getQuotationById:", error);
            throw error;
        }
    },

    updateQuotation: async (quotationId, updateData) => {
        try {
            const [updatedRowsCount] = await Quotation.update(updateData, {
                where: { id: quotationId }
            });

            if (updatedRowsCount > 0) {
                return await Quotation.findByPk(quotationId);
            }
            return null;
        } catch (error) {
            console.error("Error in updateQuotation:", error);
            throw error;
        }
    },

    deleteQuotation: async (quotationId) => {
        const deletedCount = await Quotation.destroy({ where: { id: quotationId } });
        return deletedCount > 0 ? { quotationId } : null;
    },

    getAllQuotations: async () => {
        return await Quotation.findAll({
            attributes: ["id", "quotationNo", "clientName", "clientCompany", "amount", "status", "createdDate", "validUntil"],
            order: [["createdDate", "DESC"]],
        });
    },

    getQuotationList: async (page = 1, searchString = "") => {
        const limit = 10;
        const offset = (page - 1) * limit;
        const whereClause = searchString ? {
            [Op.or]: [
                { quotationNo: { [Op.iLike]: `%${searchString}%` } },
                { clientName: { [Op.iLike]: `%${searchString}%` } },
                { clientCompany: { [Op.iLike]: `%${searchString}%` } },
            ],  
        } : {};

        const { count, rows } = await Quotation.findAndCountAll({
            where: whereClause,
            attributes: ["id", "quotationNo", "clientName", "clientCompany", "amount", "status", "createdDate", "validUntil"],
            order: [["createdDate", "DESC"]],
            limit,
            offset,
        });
        const totalPages = Math.ceil(count / limit);
        return { quotations: rows, currentPage: page, totalPages, totalItems: count };
    }   
    

};

module.exports = quotationService;
