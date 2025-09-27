
const Assign = require("../models/assign.model");
const Lead = require("../models/lead.model");

const assignService = {

    fetchAssignList: async ({ assignedTo, leadId, page = 1, limit = 10 }) => {
        const where = {};

        // Optional filters
        if (assignedTo) where.assignedTo = assignedTo;
        if (leadId) where.leadId = leadId;

        const offset = (page - 1) * limit;

        // Fetch with count for pagination
        const { count, rows } = await Assign.findAndCountAll({
            where,
            limit,
            offset,
            order: [["createdAt", "DESC"]]
        });

        return {
            data: rows,
            pagination: {
                total: count,
                page,
                limit,
                totalPages: Math.ceil(count / limit)
            }
        };
    },

   createAssignService : async (data) => {
    const { leadId, assignedTo, name, email, mobile, company, leadSource } = data;

    if (!assignedTo) throw new Error("assignedTo is required");

    let actualLeadId;

    if (leadId) {
        // Check if Lead exists
        let lead = await Lead.findByPk(leadId);
        if (!lead) {
            // Lead does not exist → create new Lead
            lead = await Lead.create({
                name: name || `Lead_${Date.now()}`,
                email: email || null,
                mobile: mobile || null,
                company: company || null
            });
        }
        actualLeadId = lead.id;
    } else {

        const lead = await Lead.create({
            name: name || `Lead_${Date.now()}`,
            email: email || null,
            mobile: mobile || null,
            company: company || null
        });
        actualLeadId = lead.id;
    }

    // Create Assign linked to Lead
    const assign = await Assign.create({
        name: name || null,
        email: email || null,
        mobile: mobile || null,
        company: company || null,
        leadSource: leadSource || "Other",
        leadId: actualLeadId,
        assignedTo
    });

    // Fetch Assign with Lead details
    const result = await Assign.findOne({
        where: { id: assign.id },
        include: [{ model: Lead, as: "lead" }]
    });

    return result;

},

}
module.exports = assignService