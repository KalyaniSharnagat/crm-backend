const workServices = require("../../services/work.service");

const deleteWork = async (request, response) => {
    try {
        const { id } = request.params;

        // Check if work exists
        const existingWork = await workServices.getWorkById(id);
        if (!existingWork) {
            return response.status(200).json({
                status: "FAILED",
                message: "Work not found",
            });
        }

        // Delete work
        const deleted = await workServices.deleteWork(id);
        if (deleted) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Work deleted successfully",
                data: deleted
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to delete Work, Please try again!",
            });
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = deleteWork;
