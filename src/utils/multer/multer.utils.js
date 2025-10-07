const multer = require('multer');

//check multer upload file size
module.exports.MULTER_UPLOAD_FILE_SIZE_LIMIT = Number(process.env.FILE_SIZE) ?? 2000000


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


module.exports.runMiddleware = (req, res, fn) => {
    return new Promise((resolve, reject) => {
        fn(req, res, (result) => {
            if (result instanceof multer.MulterError || result?.code) {
                if (result.code === 'LIMIT_FILE_COUNT') {
                    res.statusCode === 200;
                    return res.json({
                        status: "FAILED",
                        message: "Too many files selected"
                    });
                }
                if (result.code === "ONLY_IMAGE_ALLOWED") {
                    res.statusCode === 200;
                    return res.json({
                        status: "FAILED",
                        message: "Only image allowed"
                    });
                };

                if (result.code === "LIMIT_FILE_SIZE") {
                    res.statusCode === 200
                    return res.json({
                        status: "FAILED",
                        message: `${result?.field} file size exceeds the limit,Please check the ${result?.field} files`
                    })
                }

                if (result.code === "FILE_SIZE_ZERO") {
                    res.statusCode === 200;
                    return res.json({
                        status: "FAILED",
                        message: "File not selected / file size equals to zero "
                    });
                };

                return reject(result)
            }
            return resolve(result)
        });
    });
};