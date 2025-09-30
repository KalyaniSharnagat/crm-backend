const leadServices = require("../../services/lead.service");
const notificationService = require("../../services/notification.service");

const LeadAddedNotification = async (dataToInsert, userId = null) => {
    try {
        // Step 1: Create the lead first
        const lead = await leadServices.createLead(dataToInsert);

        // Step 2: Trigger notification after successful creation
        await notificationService.leadAdded(lead, userId);

        console.log(`Notification created for Lead ID: ${lead.id}`);

        return lead; // optional: return the created lead
    } catch (error) {
        console.error("Error creating lead notification:", error);
        throw error; // so that controller can handle it
    }
};

module.exports = LeadAddedNotification;
