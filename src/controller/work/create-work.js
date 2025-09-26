const workServices = require("../../services/work.service");
const { createWorkValidationSchema } = require("../../utils/validation/admin.validation");


const createWork = async (request, response) => {
    try {
        // Extract data from request body
        const { leadName, quotationNo, startDate, endDate, assignedTo, status, description, notes } = request.body;

        // Check validation
        const validationResult = await createWorkValidationSchema.validate(
            { leadName, quotationId, startDate, endDate, assignedTo, status, description, notes },
            { abortEarly: true }
        );

        if (validationResult.error) {
            response.status(200).json({
                status: "FAILED",
                message: validationResult?.error?.details[0]?.message,
            });
            return;
        }

        // Check if Work already exists for same lead + quotation
        const isWorkExist = await workServices.getWorkByLeadAndQuotation(leadName, quotationNo);
        if (isWorkExist) {
            response.status(200).json({
                status: "FAILED",
                message: "Work already exists for this Lead and Quotation. Please try updating it.",
            });
            return;
        }

        const dataToInsert = {
            leadName,
            quotationId,
            startDate,
            endDate,
            assignedTo,
            status: status || "Not Started",
            description: description || null,
            notes: notes || null,
        };

        // Insert data into DB & send response
        const result = await workServices.createWork(dataToInsert);
        if (result) {
            response.status(200).json({
                status: "SUCCESS",
                message: "Work created successfully",
                data: result
            });
            return;
        } else {
            response.status(200).json({
                status: "FAILED",
                message: "Failed to create Work, Please try again!",
            });
            return;
        }

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = createWork;
