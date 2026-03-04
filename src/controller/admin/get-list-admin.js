const adminServices = require("../../services/admin.service");

const getAdminList = async (req, res) => {
    try {
        const { page, limit, searchString, role, isActive } = req.body;


        const result = await adminServices.getAdminList({ page, limit, searchString, role, isActive });

        if (result?.totalPages > 0) {
            return res.status(200).json({
                status: "SUCCESS",
                message: "User fetched successfully",
                page,
                searchString,
                ...result
            });
        } else {
            return res.status(200).json({
                status: "FAILED",
                message: "No User found",
                page,
                searchString
            });
        }

    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = getAdminList;
