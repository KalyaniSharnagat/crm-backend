const multer = require('multer');
const fs = require('fs');
const uniqId = require('uniqid');

const FILE_SIZE_LIMIT = 10 * 1024 * 1024;

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        const path = `public/images/`;
        if (!fs.existsSync(path)) {
            fs.mkdirSync(path)
        }
        cb(null, path)
    },
    filename: (req, file, cb) => {
        let ext = '';
        if (file.originalname.lastIndexOf('.') > 0) {
            ext = file.originalname.slice(file.originalname.lastIndexOf('.'));
        } else {
            ext = file.mimetype.split("/")[1] ? `.${file.mimetype.split("/")[1]}` : "";
        }
        cb(null, `${uniqId()}-${Date.now()}${ext}`);
    }
});

const uploadCommon = multer({
    storage: storage,
    limits: { fileSize: FILE_SIZE_LIMIT },
});

module.exports = uploadCommon;