// controllers/lead.controller.js
const leadServices = require("../../services/lead.service");

const deleteLead = async (request, response) => {
    try {
        const { id } = request.body;

        if (!id) {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead ID is required to delete",
            });
        }

        const result = await leadServices.deleteLead(id);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Lead deleted successfully",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead not found or already deleted",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message,
        });
    }
};

module.exports = deleteLead;
