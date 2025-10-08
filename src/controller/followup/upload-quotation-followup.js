const multerUtils = require("../../utils/multer/multer.utils");
const uploadCommon = require("../../utils/multer/common-upload").single("file");
const runMiddleware = multerUtils.runMiddleware;

const uploadQuotationFiles = async (req, res) => {
    try {
        await runMiddleware(req, res, uploadCommon);

        const fileName = req.file?.filename;
        if (!fileName) {
            return res.status(400).json({
                status: "FAILED",
                message: "No files uploaded"
            });
        }

        return res.status(200).json({
            status: "SUCCESS",
            message: "File uploaded successfully",
            data: { file: [fileName] }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ status: "FAILED", message: error.message });
    }
};

module.exports = uploadQuotationFiles;
