const followUpService = require("../../services/followup.service");

const approveFollowUp = async (request, response) => {
  try {
    const { id, approvedBy } = request.body;

    if (!id || !approvedBy) {
      return response.status(200).json({
        status: "FAILED",
        message: "Follow-up ID and approvedBy are required",
      });
    }

    const followup = await followUpService.getFollowUpById(id);
    if (!followup) {
      return response.status(200).json({
        status: "FAILED",
        message: "Follow-up not found",
      });
    }

    const result = await followUpService.updateFollowUp(id, {
      status: "Approved",
      approvedBy,
      approvalDate: new Date()
    });

    return response.status(200).json({
      status: "SUCCESS",
      message: "Follow-up approved successfully",
      data: result
    });

  } catch (error) {
    return response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = approveFollowUp;
