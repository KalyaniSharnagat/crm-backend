const adminService = require("../../services/admin.service");
const assignService = require("../../services/assign.service");
const leadListService = require("../../services/lead.service");

const createAssign = async (request, response) => {
    try {
        const { id } = request;

        const { leadId, assignTo } = request.body;



        const isLeadExist = await leadListService.getLeadById(leadId)
        if (isLeadExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Lead does not exist"
            })
        }

        const isAdminExist = await adminService.getAdminById(assignTo)
        if (isAdminExist) {
            return response.status(200).json({
                status: "FAILED",
                message: "Selected assign to user does not exist"
            })
        }

        const dataToInsert = {
            leadId: isLeadExist?.id ?? leadId,
            assignTo: isAdminExist?.id ?? assignTo,
            assignByUser: id,
        };

        const result = await assignService.createAssign(dataToInsert);

        if (result) {
            return response.status(200).json({
                status: "SUCCESS",
                message: "Lead assigned successfully",
            });
        } else {
            return response.status(200).json({
                status: "FAILED",
                message: "Failed to assign lead successfully, Please try again",
            });
        }
    } catch (error) {
        return response.status(500).json({
            status: "FAILED",
            message: error.message
        });
    }
};

module.exports = createAssign;
