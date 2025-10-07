const quotationServices = require("../../services/quotation.service");

const uploadQuotationFiles = async (req, res) => {
    try {
        const file = req.file;

        if (!file) {
            return res.status(200).json({
                status: "FAILED",
                message: "File is required.",
            });
        }

        // const result = await quotationServices.createQuotation({
        //     filePath: `public/quotations/${file.filename}`,
        //     originalName: file.originalname,
        // });

        return res.status(200).json({
            status: "SUCCESS",
            message: "File uploaded successfully.",
            data: result,
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = uploadQuotationFiles;
