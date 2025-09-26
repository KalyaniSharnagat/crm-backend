const workServices = require("../../services/work.service");
const { createWorkValidationSchema } = require("../../utils/validation/admin.validation");

const createWork = async (request, response) => {
    try {
        const { workId, leadName, quotationNo, startDate, endDate, assignedTo, status, description, notes } = request.body;

        // Validation
        const validationResult = await createWorkValidationSchema.validate(
            { workId, leadName, quotationNo, startDate, endDate, assignedTo, status, description, notes },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return response.status(200).json({
                status: "FAILED",
                message: validationResult.error.details[0].message
            });
        }

        // Check duplicate
        const isWorkExist = await workServices.getWorkByLeadAndQuotation(leadName, quotationNo);
        if (isWorkExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Work already exists for this Lead and Quotation. Please try updating it."
            });
        }

        // Insert into DB
        const dataToInsert = {
            workId,
            leadName,
            quotationNo,
            startDate,
            endDate,
            assignedTo,
            status: status || "Not Started",
            description: description || null,
            notes: notes || null
        };

        await workServices.createWork(dataToInsert);

        // ✅ Only status & message in response
        return response.status(200).json({
            status: "SUCCESS",
            message: "Work created successfully"
        });

    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = createWork;
