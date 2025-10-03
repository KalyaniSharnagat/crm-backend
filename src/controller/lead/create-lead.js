const leadService = require("../../services/lead.service");
const { createLeadValidationSchema } = require("../../utils/validation/admin.validation");

const createLead = async (req, res) => {
    try {
        const { name, email, mobile, company, status, assignedTo, leadSource, notes, projectName, interestPercentage } = req.body;

        const validationResult = createLeadValidationSchema.validate(
            { name, email, mobile, company, status, assignedTo, leadSource, notes, projectName, interestPercentage },
            { abortEarly: true }
        );

        if (validationResult.error) {
            return res.status(200).json({ status: "FAILED", message: validationResult.error.details[0].message });
        }

        const isLeadExist = await leadService.getLeadByEmail(email);
        if (isLeadExist) {
            return res.status(200).json({ status: "FAILED", message: "Lead already exists with this email" });
        }

        const lead = await leadService.createLead({
            name,
            email,
            mobile,
            company,
            status: status || "new",
            assignedTo: assignedTo || null,
            leadSource,
            notes,
            projectName,
            interestPercentage,
        });

        return res.status(200).json({ status: "SUCCESS", message: "Lead added successfully", data: lead });
    } catch (error) {
        return res.status(500).json({ status: "FAILED", message: error.message });
    }
};

module.exports = createLead;
