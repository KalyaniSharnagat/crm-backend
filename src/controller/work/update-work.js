const workServices = require("../../services/work.service");
const { updateWorkValidationSchema } = require("../../utils/validation/admin.validation"); // updated schema for updates

const updateWork = async (request, response) => {
    try {
        // Validate request body
        const { error, value } = updateWorkValidationSchema.validate(request.body, { abortEarly: true });
        if (error) {
            return response.status(200).json({
                status: "FAILED",
                message: error.details[0].message
            });
        }

        const { workId, quotationNo, startDate, endDate, assignedTo, status, description, notes } = value;

        // Check if work exists
        const work = await workServices.getWorkByWorkId(workId);
        if (!work) {
            return response.status(200).json({
                status: "FAILED",
                message: "Work not found"
            });
        }

        // Prepare updated data (do NOT update leadName)
        const updatedData = {
            quotationNo: quotationNo || work.quotationNo,
            startDate: startDate || work.startDate,
            endDate: endDate || work.endDate,
            assignedTo: assignedTo || work.assignedTo,
            status: status || work.status,
            description: description || work.description,
            notes: notes || work.notes
        };

        // Update in DB
        const updatedWork = await workServices.updateWork(work.id, updatedData);

        // Return success response
        return response.status(200).json({
            status: "SUCCESS",
            message: "Work updated successfully",
            data: {
                id: updatedWork.id
            }
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = updateWork;
