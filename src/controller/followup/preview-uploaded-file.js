const fs = require("fs");
const path = require("path");

const previewFile = (req, res) => {
    try {
        const { filename } = req.query;

        if (!filename) {
            return res.status(400).json({
                status: "FAILED",
                message: "Filename is required",
            });
        }

        const filePath = path.join(__dirname, "../../uploads/quotations", filename);

        if (!fs.existsSync(filePath)) {
            return res.status(404).json({
                status: "FAILED",
                message: "File not found",
            });
        }

        // Set appropriate headers for preview
        const ext = path.extname(filename).toLowerCase();
        let contentType = "application/octet-stream";

        if (ext === ".pdf") contentType = "application/pdf";
        else if ([".jpg", ".jpeg"].includes(ext)) contentType = "image/jpeg";
        else if (ext === ".png") contentType = "image/png";

        res.setHeader("Content-Type", contentType);

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);
    } catch (error) {
        console.error(error);
        res.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = previewFile;
