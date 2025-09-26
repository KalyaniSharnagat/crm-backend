const workServices = require("../../services/work.service");
const { updateWorkValidationSchema } = require("../../utils/validation/admin.validation");

const updateWork = async (request, response) => {
    try {
        const { id } = request.params;
        const { startDate, endDate, assignedTo, status, description, notes } = request.body;

        // Validation
        const validationResult = await updateWorkValidationSchema.validate(
            { startDate, endDate, assignedTo, status, description, notes },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
        }

        // Check if work exists
        const existingWork = await workServices.getWorkById(id);
        if (!existingWork) {
            return response.status(200).json({
                status: "FAILED",
                message: "Work not found",
            });
        }

        // Update work
        const updatedWork = await workServices.updateWork(id, {
            startDate,
            endDate,
            assignedTo,
            status,
            description,
            notes
        });

        return response.status(200).json({
            status: "SUCCESS",
            message: "Work updated successfully",
            data: updatedWork
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = updateWork;
