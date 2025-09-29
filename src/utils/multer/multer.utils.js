const multer = require('multer');

//check multer upload file size
module.exports.MULTER_UPLOAD_FILE_SIZE_LIMIT = Number(process.env.FILE_SIZE) ?? 2000000 //2MB


//check multer file type jpeg, jpg, png or not
module.exports.multerFileTypeImage = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        // check for extension also
        const extension = file.originalname.split('.').pop().toLowerCase(); // this will give last element
        // check for if extension allowed
        if (["jpeg", "jpg", "png"].includes(extension)) {
            cb(null, true);
        } else {
            cb({ code: "ONLY_IMAGE_ALLOWED" }, false);
        };
    } else {
        cb({ code: "ONLY_IMAGE_ALLOWED" }, false);
    };
};


//check multer file type jpeg, jpg, png, pdf or not
module.exports.multerFileTypeFilterForPdfJpgAndPng = (req, file, cb) => {
    if (file.mimetype === 'application/pdf' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg' || file.mimetype === 'image/png') {
        // check for extension also
        const extension = file.originalname.split('.').pop().toLowerCase(); // this will give last element

        // check for if extension allowed
        if (["pdf", "jpeg", "jpg", "png"].includes(extension)) {
            cb(null, true);
        } else {
            cb({ code: "ONLY_IMAGE_AND_PDF_ALLOWED" }, false);
        }
    } else {
        cb({ code: "ONLY_IMAGE_AND_PDF_ALLOWED" }, false);
    }
};

//check multer file type jpeg, jpg, png, pdf or not
module.exports.multerFileTypeFilterForImage = (req, file, cb) => {
    if (
        // Check for image mimeTypes and extensions
        (file.mimetype.startsWith('image/') && ['jpeg', 'jpg', 'png'].includes(file.originalname.split('.').pop().toLowerCase()))) {
        cb(null, true);
    } else {
        cb({ code: "ONLY_IMAGE_ALLOWED" }, false);
    }
};