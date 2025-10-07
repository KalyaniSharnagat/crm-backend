const multer = require('multer');

// Check multer upload file size
module.exports.MULTER_UPLOAD_FILE_SIZE_LIMIT = Number(process.env.FILE_SIZE) ?? 2000000; // 2MB

// Check image type
module.exports.multerFileTypeImage = (req, file, cb) => {
    const allowed = ["jpeg", "jpg", "png"];
    const ext = file.originalname.split('.').pop().toLowerCase();
    if (file.mimetype.startsWith('image/') && allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb({ code: "ONLY_IMAGE_ALLOWED" }, false);
    }
};

// Check PDF/JPG/PNG type
module.exports.multerFileTypeFilterForPdfJpgAndPng = (req, file, cb) => {
    const allowed = ["pdf", "jpeg", "jpg", "png"];
    const ext = file.originalname.split('.').pop().toLowerCase();
    if ((file.mimetype === 'application/pdf' || file.mimetype.startsWith('image/')) && allowed.includes(ext)) {
        cb(null, true);
    } else {
        cb({ code: "ONLY_IMAGE_AND_PDF_ALLOWED" }, false);
    }
};

// Helper to run multer middleware as promise
module.exports.runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof multer.MulterError || result?.code) {
                if (result.code === 'LIMIT_FILE_COUNT') return res.json({ status: "FAILED", message: "Too many files selected" });
                if (result.code === "ONLY_IMAGE_ALLOWED") return res.json({ status: "FAILED", message: "Only image allowed" });
                if (result.code === "ONLY_IMAGE_AND_PDF_ALLOWED") return res.json({ status: "FAILED", message: "Only PDF/JPG/PNG allowed" });
                if (result.code === "LIMIT_FILE_SIZE") return res.json({ status: "FAILED", message: "File exceeds size limit" });
                return reject(result);
            }
            return resolve(result);
        });
    });
};
