const adminServices = require("../../services/admin.service");

const getAdminDetails = async (request, response) => {
    try {

        //get data from db & send response to client
        const admin = await adminServices.getAdminDetails();
        if (admin?.length > 0) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Admin user fetch successfully",
                admin
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Admin user not available",
            });
            return;
        }
    } catch (error) {
        response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
        return;
    }
};


module.exports = getAdminDetails;