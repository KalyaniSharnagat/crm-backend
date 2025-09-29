const multer = require('multer');
const fs = require('fs');
const multerUtils = require("./multer.utils")
const uniqId = require('uniqid');
const fileSize = Number(process.env.FILE_SIZE) ?? 6000000 //6MB

const multerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `public/product/`;// file added to the public folder of the root directory
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path, { recursive: true })
        }
        cb(null, path)
    },
    filename: function (req, file, cb) {
        try {
            const extension = file.mimetype.split("/")[1];// extract extension
            const filename = `${uniqId()}.${extension}`;
            cb(null, filename);
        } catch (error) {
            cb(error, null);
        }
    }
});

const uploadQuotation = multer({ storage: multerStorage, limits: { fileSize: fileSize }, fileFilter: multerUtils?.multerFileTypeFilterForImage });
module.exports = { uploadQuotation };