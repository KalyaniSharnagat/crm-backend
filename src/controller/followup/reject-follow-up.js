const followUpService = require("../../services/followup.service");

const rejectFollowUp = async (request, response) => {
  try {
    const { id, rejectedBy, rejectionReason } = request.body;

    if (!id || !rejectedBy) {
      return response.status(200).json({
        status: "FAILED",
        message: "Follow-up ID and rejectedBy are required",
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
      status: "Rejected",
      rejectedBy,
      rejectionReason,
      rejectionDate: new Date()
    });

    return response.status(200).json({
      status: "SUCCESS",
      message: "Follow-up rejected successfully",
      data: result
    });

  } catch (error) {
    return response.status(500).json({
      status: "FAILED",
      message: error.message,
    });
  }
};

module.exports = rejectFollowUp;
