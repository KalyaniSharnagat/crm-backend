const assignService = require("../../services/assign.service");


const createAssign = async (req, res) => {
    try {
        const data = req.body;
        const result = await assignService.createAssignService(data);

        return res.status(201).json({
            status: "SUCCESS",
            message: "Assign created successfully",
            data: result
        });
    } catch (error) {
        return res.status(500).json({
            status: "FAILED",
            message: error.message || "Something went wrong"
        });
    }
};

module.exports = createAssign 
