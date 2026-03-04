const multer = require('multer');
const fs = require('fs');
const uniqId = require('uniqid');
const multerUtils = require("./multer.utils");

const FILE_SIZE_LIMIT = Number(process.env.FILE_SIZE) || 6 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const path = `public/uploads/`;
        if (!fs.existsSync(path)) fs.mkdirSync(path, { recursive: true });
        cb(null, path);
    },
    filename: (req, file, cb) => {
        const ext = file.originalname.split('.').pop();
        cb(null, `${uniqId()}-${Date.now()}.${ext}`);
    }
});

const uploadCommon = multer({
    storage,
    limits: { fileSize: FILE_SIZE_LIMIT },
    fileFilter: multerUtils.multerFileTypeFilterForPdfJpgAndPng,
});

module.exports = uploadCommon;
