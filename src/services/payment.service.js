const Payment = require("../models/payment.model");
const { Op } = require("sequelize");
const PDFDocument = require("pdfkit");
const bwipjs = require("bwip-js"); // For barcode


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
        const [updated] = await Payment.update(data, {
            where: { id },
        });

        if (updated) {
            const updatedPayment = await Payment.findByPk(id);
            return updatedPayment; // ✅ return updated record
        }

        return null;
    },

    downloadReceipt: async (paymentId) => {
        const payment = await Payment.findOne({ where: { paymentId } });
        if (!payment) return null;
        return { payment };
    },

    generateReceiptPDF: async (payment, res) => {
        const doc = new PDFDocument({
            size: [250, 600], // Narrow width like receipt
            margins: { top: 20, bottom: 20, left: 10, right: 10 }
        });

        let filename = `Receipt-${payment.paymentId}.pdf`;
        filename = encodeURIComponent(filename);

        res.setHeader("Content-disposition", `attachment; filename="${filename}"`);
        res.setHeader("Content-type", "application/pdf");

        doc.pipe(res);

        // --- Header ---
        doc.font('Helvetica-Bold').fontSize(12).text("CASH RECEIPT", { align: "center" });
        doc.moveDown(0.5);

        doc.font('Helvetica').fontSize(9);
        doc.text(`SHOP: My Company`);
        doc.text(`ADDRESS: Your Address Here`);
        doc.text(`TEL.: 123456789`);
        doc.text(`DATE: ${new Date(payment.createdAt).toLocaleDateString()}`);
        doc.text('--------------------------------------');

        // --- Items / Payment Info ---
        const info = [
            { label: "Project Name", value: payment.projectName },
            { label: "Client Name", value: payment.clientName },
            { label: "Payment Method", value: payment.paymentMethod },
            { label: "Installment No", value: payment.installmentNo },
            { label: "Amount Paid", value: `₹ ${payment.amount}` },
            { label: "Total Amount", value: `₹ ${payment.totalAmount}` },
            { label: "Due Date", value: payment.dueDate },
            { label: "Notes", value: payment.notes || "-" }
        ];

        info.forEach(item => {
            doc.font('Helvetica-Bold').text(item.label + ": ", { continued: true })
                .font('Helvetica').text(item.value);
        });

        doc.text('--------------------------------------');
        doc.font('Helvetica-Bold').text(`TOTAL: ₹ ${payment.amount}`, { align: "right" });
        doc.text('--------------------------------------');

        doc.moveDown(1);

        // --- Barcode (paymentId) ---
        const barcodeBuffer = await bwipjs.toBuffer({
            bcid: 'code128',       // Barcode type
            text: payment.paymentId,
            scale: 2,
            height: 20,
            includetext: false
        });
        doc.image(barcodeBuffer, { align: 'center', width: 150, height: 40 });
        doc.moveDown(0.5);

        // Footer
        doc.font('Helvetica').fontSize(10).text("THANK YOU", { align: "center" });

        doc.end();
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
