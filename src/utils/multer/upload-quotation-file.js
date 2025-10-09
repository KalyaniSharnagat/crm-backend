const multer = require("multer");
const fs = require("fs");
const uniqid = require("uniqid");

// 6MB max file size
const fileSize = Number(process.env.FILE_SIZE) || 6 * 1024 * 1024;

// ✅ Storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = "public/followup/";
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true });
        }
        cb(null, path);
    },
    filename: function (req, file, cb) {
        try {
            const extension = file.originalname.split(".").pop();
            const filename = `${uniqid()}.${extension}`;
            cb(null, filename);
        } catch (error) {
            cb(error, null);
        }
    },
});

// ✅ File filter (images + PDF allowed)
const fileFilter = (req, file, cb) => {
    const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "application/pdf"];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Only JPG, PNG, and PDF files are allowed!"));
    }
};

// ✅ Multer upload instance
const uploadquotation = multer({
    storage,
    limits: { fileSize },
    fileFilter,
});

module.exports = { uploadquotation };
