const Payment = require("../models/payment.model");
const { Op } = require("sequelize");

const paymentService = {
    createPayment: async (data) => {
        return await Payment.create(data);
    },

    getallPayments: async (filter = {}) => {
        return Payment.findAll({ where: filter });
    },

    getPaymentById: async (id) => {
        return await Payment.findByPk(id)
    },
    updatePayment: async (id, data) => {
        const payment = await Payment.findByPk(id);
        if (!payment) return null;
        // await payment.update(data);
        return payment;
    },
    deletePayment: async (id) => {
        const payment = await Payment.findByPk(id);
        if (!payment) return null;

        await payment.destroy();
        return true;
    },
    markPaymentPaid: async (id, { paidDate, amountPaid, paymentMethod }) => {
        const payment = await Payment.findByPk(id);
        if (!payment) return null;

        let newStatus = "Partially Paid";
        if (amountPaid >= payment.amount) newStatus = "Completed";

        await payment.update({ paidDate, amount: amountPaid, paymentMethod, status: newStatus });
        return payment;
    },

    getPaymentList: async (page = 1, searchString = "") => {
        const limit = 10; // items per page
        const offset = (page - 1) * limit;

        const where = {};

        if (searchString) {
            // search by projectName or clientName
            where[Op.or] = [
                { projectName: { [Op.iLike]: `%${searchString}%` } },
                { clientName: { [Op.iLike]: `%${searchString}%` } }
            ];
        }

        const { rows, count } = await Payment.findAndCountAll({
            where,
            limit,
            offset,
            order: [["createdAt", "DESC"]]
        });

        const totalPages = Math.ceil(count / limit);

        return {
            payments: rows,
            totalPages,
            currentPage: page,
            totalItems: count
        };
    }

};

module.exports = paymentService 
